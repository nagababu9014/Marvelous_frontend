import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "./PaymentSuccessPage.css";

const PaymentSuccessPage = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const { fetchCartCount } = useCart();

  useEffect(() => {
    const timer = setTimeout(async () => {
      // 🔥 Sync cart AFTER webhook
      await fetchCartCount();
      navigate("/my-orders");
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

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
