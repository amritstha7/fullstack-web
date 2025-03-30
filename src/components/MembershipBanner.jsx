import { Link } from "react-router-dom"
import { Card, CardContent } from "./ui/card"
import { Button } from "./ui/button"
import { useCart } from "../context/CartProvider"

function MembershipBanner() {
  const { isLoggedIn } = useCart()

  return (
    <Card className="bg-primary/5 border-none overflow-hidden">
      <CardContent className="p-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-3 text-center md:text-left">
          <h3 className="text-2xl font-bold">Be a StyleHub Member</h3>
          <p className="text-muted-foreground max-w-[500px]">
            Join our membership program for exclusive discounts, early access to new collections, and free shipping on
            all orders.
          </p>
        </div>
        {isLoggedIn ? (
          <div className="flex flex-col items-center md:items-start gap-2">
            <span className="text-sm font-medium text-green-600">You're a member!</span>
            <Button asChild variant="outline">
              <Link to="/account">View Member Benefits</Link>
            </Button>
          </div>
        ) : (
          <Button asChild size="lg">
            <Link to="/signup">Join Now</Link>
          </Button>
        )}
      </CardContent>
    </Card>
  )
}

export default MembershipBanner

