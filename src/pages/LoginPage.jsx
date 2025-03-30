"use client"

import { useState } from "react"
import axios from "axios"
import { Link, useNavigate, useLocation } from "react-router-dom"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card"
import { Checkbox } from "../components/ui/checkbox"
import { useCart } from "../context/CartProvider"

function LoginPage() {
  const [formState, setFormState] = useState({
    email: "",
    password: "",
    rememberMe: false,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState(null)

  const { login } = useCart()
  const navigate = useNavigate()
  const location = useLocation()
  const successMessage = location.state?.message

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormState((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))

    if (error) {
      setError(null)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!formState.email || !formState.password) {
      setError("Please enter both email and password")
      return
    }

    setIsSubmitting(true)

    try {
      const response = await axios.post(
        "http://localhost:3002/api/auth/login",
        {
          email: formState.email,
          password: formState.password,
        },
        console.log('Data sent to backend:', {
          email: formState.email,
          password: formState.password
        })
  ,
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      )
    
      console.log("Login successful:", response.data)

      // Save token in localStorage
      localStorage.setItem("token", response.data.token)

      // Update app state
      login(response.data.user)

      // Redirect to home
      navigate("/")
    } catch (error) {
      console.error("Login error:", error)
      setError(error.response?.data?.error || "Invalid email or password")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="container px-4 py-12 mx-auto max-w-md">
      <Card>
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Sign in</CardTitle>
          <CardDescription className="text-center">
            Enter your email and password to access your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          {successMessage && (
            <div className="bg-green-50 text-green-600 p-3 rounded-md mb-4 text-sm">{successMessage}</div>
          )}
          {error && <div className="bg-red-50 text-red-500 p-3 rounded-md mb-4 text-sm">{error}</div>}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" value={formState.email} onChange={handleChange} />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link to="/forgot-password" className="text-sm text-primary hover:underline">
                  Forgot password?
                </Link>
              </div>
              <Input id="password" name="password" type="password" value={formState.password} onChange={handleChange} />
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="rememberMe"
                name="rememberMe"
                checked={formState.rememberMe}
                onCheckedChange={(checked) => {
                  setFormState((prev) => ({
                    ...prev,
                    rememberMe: checked,
                  }))
                }}
              />
              <Label htmlFor="rememberMe" className="text-sm">
                Remember me
              </Label>
            </div>
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Signing in..." : "Sign in"}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col">
          <div className="text-sm text-center text-muted-foreground">
            Don't have an account?{" "}
            <Link to="/signup" className="text-primary hover:underline">
              Sign up
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}

export default LoginPage

