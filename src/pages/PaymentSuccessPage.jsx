import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "./PaymentSuccessPage.css";

const PaymentSuccessPage = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const { fetchCartCount } = useCart();
useEffect(() => {
  api.get("orders/")
    .then(res => setOrders(res.data));
}, []);

  useEffect(() => {
    const timer = setTimeout(async () => {
      // 🔥 Sync cart AFTER webhook
      await fetchCartCount();
      navigate("/my-orders");
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);
useEffect(() => {
  const interval = setInterval(async () => {
    const res = await api.get(`orders/${orderId}/`);
    if (res.data.payment_status === "PAID") {
      clearInterval(interval);
      fetchCartCount();
    }
  }, 1500);

  return () => clearInterval(interval);
}, []);

  return (
    <div className="success-page">
      <div className="success-card">
        <h2>Payment Successful</h2>
        <p>Your order  has been placed successfully.</p>
        <p>You will be redirected to your orders shortly.</p>
      </div>
    </div>
  );
};

export default PaymentSuccessPage;
