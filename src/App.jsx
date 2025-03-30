import { Routes, Route } from "react-router-dom"
import Layout from "./components/Layout"
import Home from "./pages/Home"
import ProductsPage from "./pages/ProductsPage"
import ProductDetail from "./pages/ProductDetail"
import CartPage from "./pages/CartPage"
import CheckoutPage from "./pages/CheckoutPage"
import AboutPage from "./pages/AboutPage"
import ContactPage from "./pages/ContactPage"
import MenPage from "./pages/MenPage"
import WomenPage from "./pages/WomenPage"
import AccessoriesPage from "./pages/AccessoriesPage"
import SignupPage from "./pages/SignupPage"
import LoginPage from "./pages/LoginPage"
import ProfilePage from "./pages/ProfilePage"
import NotFoundPage from "./pages/NotFoundPage"

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="products" element={<ProductsPage />} />
        <Route path="products/:id" element={<ProductDetail />} />
        <Route path="products/men" element={<MenPage />} />
        <Route path="products/women" element={<WomenPage />} />
        <Route path="products/accessories" element={<AccessoriesPage />} />
        <Route path="cart" element={<CartPage />} />
        <Route path="checkout" element={<CheckoutPage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="contact" element={<ContactPage />} />
        <Route path="signup" element={<SignupPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}

export default App

