import { Link } from "react-router-dom"
import ProductGrid from "../components/ProductGrid"
import { products } from "../data/products"
import { Button } from "../components/ui/button"
import { ChevronRight } from "lucide-react"

function AccessoriesPage() {
  // Filter products for accessories category
  const accessoriesProducts = products.filter((product) => product.category === "accessories")

  return (
    <div className="container px-4 py-12 mx-auto">
      <div className="flex items-center gap-1 text-sm text-muted-foreground mb-8">
        <Link to="/" className="hover:text-foreground">
          Home
        </Link>
        <ChevronRight className="h-4 w-4" />
        <span className="text-foreground">Accessories</span>
      </div>

      <div className="flex flex-col items-center text-center space-y-2 mb-12">
        <h1 className="text-3xl font-bold tracking-tight">Accessories Collection</h1>
        <p className="text-muted-foreground max-w-[600px]">
          Complete your look with our premium accessories, from statement pieces to everyday essentials
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
        <div className="md:col-span-1 space-y-6">
          <div>
            <h3 className="text-lg font-medium mb-4">Categories</h3>
            <div className="space-y-2">
              <Button
                variant="link"
                asChild
                className="p-0 h-auto justify-start text-muted-foreground hover:text-foreground"
              >
                <Link to="/products/accessories?category=jewelry">Jewelry</Link>
              </Button>
              <Button
                variant="link"
                asChild
                className="p-0 h-auto justify-start text-muted-foreground hover:text-foreground"
              >
                <Link to="/products/accessories?category=bags">Bags</Link>
              </Button>
              <Button
                variant="link"
                asChild
                className="p-0 h-auto justify-start text-muted-foreground hover:text-foreground"
              >
                <Link to="/products/accessories?category=hats">Hats</Link>
              </Button>
              <Button
                variant="link"
                asChild
                className="p-0 h-auto justify-start text-muted-foreground hover:text-foreground"
              >
                <Link to="/products/accessories?category=belts">Belts</Link>
              </Button>
              <Button
                variant="link"
                asChild
                className="p-0 h-auto justify-start text-muted-foreground hover:text-foreground"
              >
                <Link to="/products/accessories?category=scarves">Scarves</Link>
              </Button>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-4">Collections</h3>
            <div className="space-y-2">
              <Button
                variant="link"
                asChild
                className="p-0 h-auto justify-start text-muted-foreground hover:text-foreground"
              >
                <Link to="/products/accessories?collection=new">New Arrivals</Link>
              </Button>
              <Button
                variant="link"
                asChild
                className="p-0 h-auto justify-start text-muted-foreground hover:text-foreground"
              >
                <Link to="/products/accessories?collection=bestsellers">Bestsellers</Link>
              </Button>
              <Button
                variant="link"
                asChild
                className="p-0 h-auto justify-start text-muted-foreground hover:text-foreground"
              >
                <Link to="/products/accessories?collection=sale">Sale</Link>
              </Button>
            </div>
          </div>
        </div>

        <div className="md:col-span-3">
          <ProductGrid products={accessoriesProducts} />
        </div>
      </div>
    </div>
  )
}

export default AccessoriesPage

