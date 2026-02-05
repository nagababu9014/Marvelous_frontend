import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect, useContext } from "react";
import Navbar from "./layout/Navbar";

import Home from "./pages/Home";
import CategoryPage from "./pages/CategoryPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import PaymentPage from "./pages/PaymentPage";
import PaymentSuccessPage from "./pages/PaymentSuccessPage";
import MyOrdersPage from "./pages/MyOrdersPage";
import Profile from "./pages/Profile";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import OrderTrackingPage from "./pages/OrderTrackingPage";
import api from "./api/axios";
import { LoaderContext } from "./context/LoaderContext";
import Loader from "./components/Loader";
import { Toaster } from "react-hot-toast";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import Footer from "./pages/Footer";
import { AuthContext } from "./context/AuthContext";
import TermsAndConditions from "./pages/TermsAndConditions";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import RefundPolicy from "./pages/RefundPolicy";
import CancellationPolicy from "./pages/CancellationPolicy";
import ScrollToTop from "./ScrollToTop";
export default function AppContent() {
  const { loading, setLoading } = useContext(LoaderContext);
const { authLoading } = useContext(AuthContext);

  const location = useLocation();


  // 🔥 CREATE GUEST ID (ONCE) — KEEP
  useEffect(() => {
    if (!localStorage.getItem("guest_id")) {
      localStorage.setItem("guest_id", crypto.randomUUID());
    }
  }, []);

  // 🔥 PAGE LEVEL LOADER — KEEP
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 350);
    return () => clearTimeout(timer);
  }, [location.pathname]);
  

if (authLoading) {
  return <Loader />;
}

  return (
    <>
      {loading && <Loader />}

      <Navbar />
          {/* 🔥 TOAST CONTAINER (REQUIRED) */}
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/category/:id" element={<CategoryPage />} />
        <Route path="/product/:id" element={<ProductDetailPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/payment/:orderId" element={<PaymentPage />} />
        <Route path="/payment-success/:orderId" element={<PaymentSuccessPage />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        <Route
          path="/my-orders"
          element={
            <ProtectedRoute>
              <MyOrdersPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/order/:id/track"
          element={
            <ProtectedRoute>
              <OrderTrackingPage />
            </ProtectedRoute>
          }
        />
    <Route path="/about" element={<AboutUs />} />
    <Route path="/Contact" element={<ContactUs />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
<Route path="/privacy-policy" element={<PrivacyPolicy />} />
<Route path="/refund-policy" element={<RefundPolicy />} />
<Route path="/cancellation-policy" element={<CancellationPolicy />} />

      </Routes>
      <Footer />
    </>
  );
}
