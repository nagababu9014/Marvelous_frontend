import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios";
import { useCart } from "../context/CartContext";
import "./PaymentSuccessPage.css";

const PaymentSuccessPage = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const { fetchCartCount } = useCart();
  const [orders, setOrders] = useState([]);

  // Fetch fresh orders
  useEffect(() => {
    api.get("orders/")
      .then(res => setOrders(res.data))
      .catch(() => {});
  }, []);

  // Poll order until webhook updates
  useEffect(() => {
    const interval = setInterval(async () => {
      const res = await api.get(`orders/${orderId}/`);
      if (res.data.payment_status === "PAID") {
        clearInterval(interval);
        fetchCartCount();
      }
    }, 1500);

    return () => clearInterval(interval);
  }, [orderId]);

  // Redirect after short delay
  useEffect(() => {
    const timer = setTimeout(async () => {
      await fetchCartCount();
      navigate("/my-orders");
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="success-page">
      <div className="success-card">
        <h2>Payment Successful</h2>
        <p>Your order has been placed successfully.</p>
        <p>You will be redirected to your orders shortly.</p>
      </div>
    </div>
  );
};

export default PaymentSuccessPage;
