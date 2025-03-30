"use client"

import { useState } from "react"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { Textarea } from "../components/ui/textarea"
import { Card, CardContent } from "../components/ui/card"
import { Mail, MapPin, Phone } from "lucide-react"

function ContactPage() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormState((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
      setFormState({
        name: "",
        email: "",
        subject: "",
        message: "",
      })
    }, 1500)
  }

  return (
    <div className="container px-4 py-12 mx-auto">
      <div className="flex flex-col items-center text-center space-y-2 mb-12">
        <h1 className="text-3xl font-bold tracking-tight">Contact Us</h1>
        <p className="text-muted-foreground max-w-[600px]">Have questions or feedback? We'd love to hear from you.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        <Card>
          <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Phone className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-lg font-bold">Phone</h3>
            <p className="text-muted-foreground">Mon-Fri from 8am to 5pm</p>
            <a href="tel:+1234567890" className="font-medium hover:underline">
              +1 (234) 567-890
            </a>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Mail className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-lg font-bold">Email</h3>
            <p className="text-muted-foreground">We'll respond as soon as possible</p>
            <a href="mailto:info@stylehub.com" className="font-medium hover:underline">
              info@Hamroghar.com
            </a>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
              <MapPin className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-lg font-bold">Office</h3>
            <p className="text-muted-foreground">Come say hello at our office</p>
            <p className="font-medium">44st,Bhaktapur, Nepal, NP 10001</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
        <div>
          <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
          {isSubmitted ? (
            <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
              <h3 className="text-lg font-bold text-green-600 mb-2">Message Sent!</h3>
              <p className="text-green-600">Thank you for contacting us. We'll get back to you as soon as possible.</p>
              <Button className="mt-4" onClick={() => setIsSubmitted(false)}>
                Send Another Message
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Your Name</Label>
                  <Input id="name" name="name" value={formState.name} onChange={handleChange} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Your Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formState.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input id="subject" name="subject" value={formState.subject} onChange={handleChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  name="message"
                  rows={6}
                  value={formState.message}
                  onChange={handleChange}
                  required
                />
              </div>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Sending..." : "Send Message"}
              </Button>
            </form>
          )}
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-6">Visit Our Store</h2>
          <div className="aspect-video rounded-lg overflow-hidden mb-4">
            <img
              src="/con.jpg?height=400&width=600&text=Map"
              alt="Store location map"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="space-y-4">
            <div>
              <h3 className="font-bold">Hamro-Ghar Flagship Store</h3>
              <p className="text-muted-foreground">44st,Bhaktapur, Nepal, NP 10001</p>
            </div>
            <div>
              <h3 className="font-bold">Opening Hours</h3>
              <p className="text-muted-foreground">Monday - Friday: 10am - 9pm</p>
              <p className="text-muted-foreground">Saturday: 10am - 8pm</p>
              <p className="text-muted-foreground">Sunday: 11am - 6pm</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-primary/5 p-8 rounded-lg text-center">
        <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions</h2>
        <p className="text-muted-foreground max-w-[600px] mx-auto mb-6">
          Find quick answers to common questions about our products, shipping, returns, and more.
        </p>
        <Button asChild>
          <a href="/faq">View FAQ</a>
        </Button>
      </div>
    </div>
  )
}

export default ContactPage

