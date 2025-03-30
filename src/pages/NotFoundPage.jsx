import { Link } from "react-router-dom"
import { Button } from "../components/ui/button"

function NotFoundPage() {
  return (
    <div className="container px-4 py-16 mx-auto flex flex-col items-center justify-center text-center">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <h2 className="text-2xl font-bold mb-4">Page Not Found</h2>
      <p className="text-muted-foreground max-w-[500px] mb-8">
        The page you are looking for doesn't exist or has been moved.
      </p>
      <div className="flex gap-4">
        <Button asChild>
          <Link to="/">Go Home</Link>
        </Button>
        <Button asChild variant="outline">
          <Link to="/products">Browse Products</Link>
        </Button>
      </div>
    </div>
  )
}

export default NotFoundPage

