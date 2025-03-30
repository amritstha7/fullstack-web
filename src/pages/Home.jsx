import { Link } from "react-router-dom"
import { ShoppingBag } from "lucide-react"
import { Button } from "../components/ui/button"
import HeroSection from "../components/HeroSection"
import CategorySection from "../components/CategorySection"
import FeaturedProducts from "../components/FeaturedProducts"
import MembershipBanner from "../components/MembershipBanner"

function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection />
      <div className="container px-4 py-12 mx-auto space-y-16">
        <CategorySection />
        <FeaturedProducts />
        <MembershipBanner />
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <h2 className="text-3xl font-bold tracking-tight">Ready to upgrade your style?</h2>
          <p className="max-w-[600px] text-muted-foreground">
            Discover our latest collections and find your perfect fit.
          </p>
          <Button asChild size="lg">
            <Link to="/products">
              <ShoppingBag className="w-4 h-4 mr-2" />
              Shop Now
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Home

