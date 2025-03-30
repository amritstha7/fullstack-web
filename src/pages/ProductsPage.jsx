"use client"

import { useState, useEffect } from "react"
import { useLocation } from "react-router-dom"
import ProductGrid from "../components/ProductGrid"
import { products } from "../data/products"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { Slider } from "../components/ui/slider"
import { Checkbox } from "../components/ui/checkbox"

function ProductsPage() {
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)
  const searchQuery = searchParams.get("search") || ""

  const [filteredProducts, setFilteredProducts] = useState(products)
  const [filters, setFilters] = useState({
    search: searchQuery,
    priceRange: [0, 200],
    categories: [],
  })

  // Filter products when filters change
  useEffect(() => {
    let result = [...products]

    // Apply search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase()
      result = result.filter(
        (product) =>
          product.name.toLowerCase().includes(searchLower) || product.category.toLowerCase().includes(searchLower),
      )
    }

    // Apply price range filter
    result = result.filter(
      (product) => product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1],
    )

    // Apply category filters
    if (filters.categories.length > 0) {
      result = result.filter((product) => filters.categories.includes(product.category))
    }

    setFilteredProducts(result)
  }, [filters])

  const handleSearchChange = (e) => {
    setFilters({ ...filters, search: e.target.value })
  }

  const handlePriceChange = (value) => {
    setFilters({ ...filters, priceRange: value })
  }

  const handleCategoryChange = (category) => {
    const updatedCategories = filters.categories.includes(category)
      ? filters.categories.filter((c) => c !== category)
      : [...filters.categories, category]

    setFilters({ ...filters, categories: updatedCategories })
  }

  return (
    <div className="container px-4 py-12 mx-auto">
      <div className="flex flex-col items-center text-center space-y-2 mb-12">
        <h1 className="text-3xl font-bold tracking-tight">All Products</h1>
        <p className="text-muted-foreground max-w-[600px]">Browse our complete collection of premium clothing</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium mb-2">Search</h3>
            <Input placeholder="Search products..." value={filters.search} onChange={handleSearchChange} />
          </div>

          <div>
            <h3 className="text-lg font-medium mb-2">Price Range</h3>
            <Slider
              defaultValue={[0, 200]}
              min={0}
              max={200}
              step={10}
              value={filters.priceRange}
              onValueChange={handlePriceChange}
            />
            <div className="flex justify-between mt-2 text-sm text-muted-foreground">
              <span>${filters.priceRange[0]}</span>
              <span>${filters.priceRange[1]}</span>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-2">Categories</h3>
            <div className="space-y-2">
              {["men", "women", "accessories"].map((category) => (
                <div key={category} className="flex items-center space-x-2">
                  <Checkbox
                    id={category}
                    checked={filters.categories.includes(category)}
                    onCheckedChange={() => handleCategoryChange(category)}
                  />
                  <Label htmlFor={category} className="capitalize">
                    {category}
                  </Label>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="md:col-span-3">
          <ProductGrid products={filteredProducts} />
        </div>
      </div>
    </div>
  )
}

export default ProductsPage

