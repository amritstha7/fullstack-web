"use client"

import { useState, useEffect } from "react"
import { useParams, Link, useNavigate } from "react-router-dom"
import { ChevronRight, Minus, Plus, ShoppingCart, Heart } from "lucide-react"
import { Button } from "../components/ui/button"
import { Badge } from "../components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs"
import { useCart } from "../context/CartProvider"
import { products } from "../data/products"
import { Alert, AlertDescription } from "../components/ui/alert"

function ProductDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const productId = Number.parseInt(id)
  const product = products.find((p) => p.id === productId)

  const [quantity, setQuantity] = useState(1)
  const [selectedSize, setSelectedSize] = useState("")
  const [selectedColor, setSelectedColor] = useState("")
  const [selectedImage, setSelectedImage] = useState(0)
  const [showAlert, setShowAlert] = useState(false)

  const { addToCart, isLoggedIn } = useCart()

  useEffect(() => {
    if (showAlert) {
      const timer = setTimeout(() => {
        setShowAlert(false)
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [showAlert])

  if (!product) {
    return (
      <div className="container px-4 py-12 mx-auto text-center">
        <h1 className="text-2xl font-bold">Product not found</h1>
        <p className="mt-4">The product you are looking for does not exist.</p>
        <Button asChild className="mt-6">
          <Link to="/products">Back to Products</Link>
        </Button>
      </div>
    )
  }

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) return

    addToCart({
      ...product,
      quantity,
      selectedSize,
      selectedColor,
    })

    setShowAlert(true)
  }

  return (
    <div className="container px-4 py-12 mx-auto">
      {showAlert && (
        <Alert className="fixed top-20 right-4 w-auto z-50 bg-green-50 border-green-200">
          <AlertDescription className="text-green-600 flex items-center">
            Product added to cart successfully!
          </AlertDescription>
        </Alert>
      )}

      <div className="flex items-center gap-1 text-sm text-muted-foreground mb-8">
        <Link to="/" className="hover:text-foreground">
          Home
        </Link>
        <ChevronRight className="h-4 w-4" />
        <Link to="/products" className="hover:text-foreground">
          Products
        </Link>
        <ChevronRight className="h-4 w-4" />
        <span className="text-foreground">{product.name}</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="space-y-4">
          <div className="relative aspect-square overflow-hidden rounded-lg border">
            <img
              src={product.images[selectedImage] || "/placeholder.svg"}
              alt={product.name}
              className="object-cover w-full h-full"
            />
            {product.isNew && <Badge className="absolute top-4 right-4">New</Badge>}
          </div>

          <div className="flex gap-4 overflow-x-auto pb-2">
            {product.images.map((image, index) => (
              <button
                key={index}
                className={`relative aspect-square w-20 overflow-hidden rounded-md border ${
                  selectedImage === index ? "ring-2 ring-primary" : ""
                }`}
                onClick={() => setSelectedImage(index)}
              >
                <img
                  src={image || "/placeholder.svg"}
                  alt={`${product.name} - Image ${index + 1}`}
                  className="object-cover w-full h-full"
                />
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <p className="text-2xl font-bold mt-2">${product.price.toFixed(2)}</p>
          </div>

          <p className="text-muted-foreground">{product.description}</p>

          <div className="space-y-4">
            <div>
              <h3 className="font-medium mb-2">Size</h3>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <Button
                    key={size}
                    variant={selectedSize === size ? "default" : "outline"}
                    className="min-w-[60px]"
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </Button>
                ))}
              </div>
              {!selectedSize && <p className="text-sm text-muted-foreground mt-2">Please select a size</p>}
            </div>

            <div>
              <h3 className="font-medium mb-2">Color</h3>
              <div className="flex flex-wrap gap-2">
                {product.colors.map((color) => (
                  <Button
                    key={color}
                    variant={selectedColor === color ? "default" : "outline"}
                    className="min-w-[80px]"
                    onClick={() => setSelectedColor(color)}
                  >
                    {color}
                  </Button>
                ))}
              </div>
              {!selectedColor && <p className="text-sm text-muted-foreground mt-2">Please select a color</p>}
            </div>

            <div>
              <h3 className="font-medium mb-2">Quantity</h3>
              <div className="flex items-center">
                <Button variant="outline" size="icon" onClick={() => setQuantity(Math.max(1, quantity - 1))}>
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-12 text-center">{quantity}</span>
                <Button variant="outline" size="icon" onClick={() => setQuantity(quantity + 1)}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            <Button size="lg" className="flex-1" disabled={!selectedSize || !selectedColor} onClick={handleAddToCart}>
              <ShoppingCart className="h-5 w-5 mr-2" />
              Add to Cart
            </Button>
            <Button variant="outline" size="lg">
              <Heart className="h-5 w-5" />
              <span className="sr-only">Add to Wishlist</span>
            </Button>
          </div>

          {!isLoggedIn && (
            <div className="bg-primary/5 p-4 rounded-lg">
              <p className="text-sm font-medium">Members get 10% off this item</p>
              <Button variant="link" className="p-0 h-auto text-sm" onClick={() => navigate("/signup")}>
                Join Now
              </Button>
            </div>
          )}

          <Tabs defaultValue="details">
            <TabsList className="w-full">
              <TabsTrigger value="details" className="flex-1">
                Details
              </TabsTrigger>
              <TabsTrigger value="shipping" className="flex-1">
                Shipping & Returns
              </TabsTrigger>
            </TabsList>
            <TabsContent value="details" className="space-y-4 pt-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium">Material</h4>
                  <p className="text-sm text-muted-foreground">{product.details.material}</p>
                </div>
                <div>
                  <h4 className="font-medium">Fit</h4>
                  <p className="text-sm text-muted-foreground">{product.details.fit}</p>
                </div>
                <div>
                  <h4 className="font-medium">Care</h4>
                  <p className="text-sm text-muted-foreground">{product.details.care}</p>
                </div>
                <div>
                  <h4 className="font-medium">Origin</h4>
                  <p className="text-sm text-muted-foreground">{product.details.origin}</p>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="shipping" className="space-y-4 pt-4">
              <div>
                <h4 className="font-medium">Shipping</h4>
                <p className="text-sm text-muted-foreground">
                  Free standard shipping on all orders over $100. Delivery within 3-5 business days.
                </p>
              </div>
              <div>
                <h4 className="font-medium">Returns</h4>
                <p className="text-sm text-muted-foreground">
                  We accept returns within 30 days of delivery. Items must be unworn, unwashed, and with the original
                  tags attached.
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail

