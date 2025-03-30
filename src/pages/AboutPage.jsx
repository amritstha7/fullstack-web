import { Link } from "react-router-dom"
import { Button } from "../components/ui/button"

function AboutPage() {
  return (
    <div className="container px-4 py-12 mx-auto">
      <div className="flex flex-col items-center text-center space-y-2 mb-12">
        <h1 className="text-3xl font-bold tracking-tight">About StyleHub</h1>
        <p className="text-muted-foreground max-w-[600px]">Our story, mission, and commitment to sustainable fashion</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
        <div>
          <img src="/tm.jpg?height=600&width=600" alt="StyleHub store" className="rounded-lg w-full h-auto" />
        </div>
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">Our Story</h2>
          <p className="text-muted-foreground">
            Founded in 2025, Hamro-Ghar began with a simple mission: to create high-quality, timeless clothing that
            empowers people to express themselves through fashion. What started as a small boutique in Nepal has
            grown into a global brand with a presence in major cities around the world.
          </p>
          <p className="text-muted-foreground">
            Our founder, Rajesh Hamal, believed that fashion should be accessible, sustainable, and inclusive. These core
            values continue to guide everything we do, from design to production to customer service.
          </p>
          <p className="text-muted-foreground">
            Today, Hamro-ghar is known for its commitment to quality craftsmanship, ethical production practices, and
            innovative designs that stand the test of time.
          </p>
        </div>
      </div>

      <div className="mb-16">
        <h2 className="text-2xl font-bold text-center mb-8">Our Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-primary/5 p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-3">Quality</h3>
            <p className="text-muted-foreground">
              We believe in creating products that last. Each piece is crafted with attention to detail using premium
              materials sourced from trusted partners.
            </p>
          </div>
          <div className="bg-primary/5 p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-3">Sustainability</h3>
            <p className="text-muted-foreground">
              We're committed to reducing our environmental impact through responsible sourcing, ethical manufacturing,
              and eco-friendly packaging.
            </p>
          </div>
          <div className="bg-primary/5 p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-3">Inclusivity</h3>
            <p className="text-muted-foreground">
              We design for everyone. Our collections embrace diversity in all forms, ensuring that fashion is
              accessible and representative.
            </p>
          </div>
        </div>
      </div>

      <div className="mb-16">
        <h2 className="text-2xl font-bold text-center mb-8">Our Team</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="text-center">
              <div className="aspect-square mb-4 overflow-hidden rounded-full">
                <img
                  src={`/placeholder.svg?height=300&width=300&text=Team Member ${i}`}
                  alt={`Team member ${i}`}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="font-bold">Rajesh Hamal</h3>
              <p className="text-sm text-muted-foreground">Creative Director</p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-primary/5 p-8 rounded-lg text-center">
        <h2 className="text-2xl font-bold mb-4">Join Our Journey</h2>
        <p className="text-muted-foreground max-w-[600px] mx-auto mb-6">
          We're always looking for passionate individuals to join our team. Check out our current openings or reach out
          to learn more about career opportunities at Hamro-Ghar.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button asChild>
            <Link to="/careers">View Careers</Link>
          </Button>
          <Button asChild variant="outline">
            <Link to="/contact">Contact Us</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

export default AboutPage

