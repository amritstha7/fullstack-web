"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"
import { Separator } from "../components/ui/separator"
import { useCart } from "../context/CartProvider"

function ProfilePage() {
  const [formState, setFormState] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    
  })
  console.log(formState) // Add this to check the formState

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState(null)
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  const { isLoggedIn } = useCart()
  const navigate = useNavigate()

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login")
      return
    }

    const fetchUserProfile = async () => {
      try {
        setIsLoading(true)
        const token = localStorage.getItem("token")

        if (!token) {
          throw new Error("No authentication token found")
        }

        const response = await axios.get("http://localhost:3002/api/auth/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        console.log(response)  // This will show the full response object.

        const userData = response.data.user
        setFormState({
          firstName: userData.firstName || "",
          lastName: userData.lastName || "",
          email: userData.email || "",
          password: "",
          confirmPassword: "",
        })
      } catch (err) {
        console.error("Error fetching profile:", err)
        setError("Failed to load profile data. Please try again.")
      } finally {
        setIsLoading(false)
      }
    }

    fetchUserProfile()
  }, [isLoggedIn, navigate])
 

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormState((prev) => ({
      ...prev,
      [name]: value,
    }))

    // Clear messages when user types
    if (message) setMessage(null)
    if (error) setError(null)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Validate passwords match if user is updating password
    if (formState.password && formState.password !== formState.confirmPassword) {
      setError("Passwords do not match")
      return
    }

    setIsSubmitting(true)

    try {
      const token = localStorage.getItem("token")

      if (!token) {
        throw new Error("No authentication token found")
      }

      // Only send password if it's been changed
      const updateData = {
        firstName: formState.firstName,
        lastName: formState.lastName,
        email: formState.email,
      }

      if (formState.password) {
        updateData.password = formState.password
      }

      await axios.put("http://localhost:3002/api/users/profile", updateData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })

      setMessage("Profile updated successfully")

      // Clear password fields after successful update
      setFormState((prev) => ({
        ...prev,
        password: "",
        confirmPassword: "",
      }))
    } catch (err) {
      console.error("Error updating profile:", err)
      setError(err.response?.data?.error || "Failed to update profile. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLoading) {
    return (
      <div className="container px-4 py-12 mx-auto text-center">
        <p>Loading profile...</p>
      </div>
    )
  }

  return (
    <div className="container px-4 py-12 mx-auto max-w-3xl">
    <h1 className="text-3xl font-bold mb-8">My Profile</h1>
  
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div className="md:col-span-1">
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col items-center text-center">
              <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <span className="text-2xl font-bold text-primary">
                  {formState.firstName && formState.firstName.charAt(0)}
                  {formState.lastName && formState.lastName.charAt(0)}
                </span>
              </div>
              <h2 className="text-xl font-bold">{`${formState.firstName} ${formState.lastName}`}</h2>
              <p className="text-sm text-muted-foreground mt-1">{formState.email}</p>
            </div>
          </CardContent>
        </Card>
      </div>
  
      <div className="md:col-span-2">
        <Card>
          <CardHeader>
            <CardTitle>Edit Profile</CardTitle>
            <CardDescription>Update your personal information</CardDescription>
          </CardHeader>
          <CardContent>
            {message && <div className="bg-green-50 text-green-600 p-3 rounded-md mb-4">{message}</div>}
            {error && <div className="bg-red-50 text-red-500 p-3 rounded-md mb-4">{error}</div>}
  
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    name="firstName"
                    value={formState.firstName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" name="lastName" value={formState.lastName} onChange={handleChange} required />
                </div>
              </div>
  
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formState.email}
                  onChange={handleChange}
                  required
                />
              </div>
  
              <Separator className="my-6" />
  
              <div className="space-y-2">
                <Label htmlFor="password">New Password (leave blank to keep current)</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={formState.password}
                  onChange={handleChange}
                />
              </div>
  
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm New Password</Label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={formState.confirmPassword}
                  onChange={handleChange}
                />
              </div>
  
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Saving..." : "Save Changes"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  </div>
  
  )
}

export default ProfilePage

