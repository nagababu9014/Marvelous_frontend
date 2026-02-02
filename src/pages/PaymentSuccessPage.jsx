import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios";
import { useCart } from "../context/CartContext";
import "./PaymentSuccessPage.css";

const PaymentSuccessPage = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const { fetchCartCount } = useCart();

  useEffect(() => {
    let attempts = 0;

    const interval = setInterval(async () => {
      attempts++;

      try {
        const res = await api.get(`orders/${orderId}/`);

        if (res.data.payment_status === "PAID") {
          clearInterval(interval);

          // 🔥 backend confirmed webhook finished
          await fetchCartCount();
          navigate("/my-orders");
        }

        // stop polling after 15 seconds
        if (attempts >= 10) {
          clearInterval(interval);
          navigate("/my-orders");
        }

      } catch (err) {
        clearInterval(interval);
        navigate("/my-orders");
      }

    }, 1500);

    return () => clearInterval(interval);
  }, [orderId]);

  return (
    <div className="success-page">
      <div className="success-card">
        <h2>Payment Successful</h2>
        <p>Confirming your order…</p>
      </div>
    </div>
  );
};

export default PaymentSuccessPage;
