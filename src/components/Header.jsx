"use client"

import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Menu, Search, ShoppingCart, User, X } from "lucide-react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { useCart } from "../context/CartProvider"

function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const { cartItems, isLoggedIn, logout } = useCart()
  const cartItemCount = cartItems.length
  const navigate = useNavigate()

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`)
      setIsSearchOpen(false)
      setSearchQuery("")
    }
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background">
      <div className="container flex h-16 items-center px-4">
        {/* Mobile menu button */}
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle menu</span>
        </Button>

        <Link to="/" className="ml-4 md:ml-0 flex items-center gap-2">
          <span className="text-xl font-bold">Hamro-Ghar</span>
        </Link>

        <nav className="mx-6 hidden md:flex items-center gap-6 text-sm">
          <Link to="/" className="font-medium transition-colors hover:text-primary">
            Home
          </Link>
          <Link to="/products" className="font-medium transition-colors hover:text-primary">
            All Products
          </Link>
          <Link to="/products/men" className="font-medium transition-colors hover:text-primary">
            Men
          </Link>
          <Link to="/products/women" className="font-medium transition-colors hover:text-primary">
            Women
          </Link>
          <Link to="/products/accessories" className="font-medium transition-colors hover:text-primary">
            Accessories
          </Link>
        </nav>

        <div className="ml-auto flex items-center gap-2">
          {isSearchOpen ? (
            <form onSubmit={handleSearch} className="relative flex items-center">
              <Input
                type="search"
                placeholder="Search products..."
                className="w-[200px] md:w-[300px]"
                autoFocus
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-0"
                onClick={() => setIsSearchOpen(false)}
              >
                <X className="h-4 w-4" />
                <span className="sr-only">Close search</span>
              </Button>
            </form>
          ) : (
            <Button variant="ghost" size="icon" onClick={() => setIsSearchOpen(true)}>
              <Search className="h-5 w-5" />
              <span className="sr-only">Search</span>
            </Button>
          )}

          {isLoggedIn ? (
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" onClick={() => navigate("/profile")}>
                <User className="h-5 w-5" />
                <span className="sr-only">Profile</span>
              </Button>
              <Button variant="ghost" size="sm" onClick={logout}>
                Logout
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" onClick={() => navigate("/login")}>
                <User className="h-5 w-5" />
                <span className="sr-only">Login</span>
              </Button>
              <Button variant="ghost" size="sm" onClick={() => navigate("/signup")}>
                Sign Up
              </Button>
            </div>
          )}

          <Link to="/cart">
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingCart className="h-5 w-5" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-primary-foreground">
                  {cartItemCount}
                </span>
              )}
              <span className="sr-only">Cart</span>
            </Button>
          </Link>
        </div>
      </div>
    </header>
  )
}

export default Header

