import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios";
import { useCart } from "../context/CartContext";
import "./PaymentSuccessPage.css";

const PaymentSuccessPage = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const { fetchCartCount } = useCart();

  const [seconds, setSeconds] = useState(6);

  useEffect(() => {
    if (!orderId) {
      console.error("❌ No orderId in URL");
      navigate("/");
      return;
    }

    let attempts = 0;
    let interval;

    const checkOrderStatus = async () => {
      try {
        const res = await api.get(`orders/${orderId}/`);

        if (res.data.payment_status === "PAID") {
          clearInterval(interval);

          // ✅ refresh cart count after webhook cleared cart
          await fetchCartCount();

          // small delay for UX smoothness
          setTimeout(() => {
            sessionStorage.setItem("forceOrdersReload", "1");
            navigate("/my-orders");
          }, 1000);
        }

      } catch (error) {
        console.error("Order fetch error:", error);
      }
    };

    interval = setInterval(() => {
      attempts++;
      checkOrderStatus();

      if (attempts >= 10) {
        clearInterval(interval);
      }
    }, 1500);

    return () => clearInterval(interval);

  }, [orderId, navigate, fetchCartCount]);

  // ⏳ Countdown UI only
  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="success-page">
      <div className="success-card">
        <div className="loader"></div>
        <h2>Payment Successful</h2>
        <p>Confirming your order…</p>
        <p>Please wait <b>{seconds}</b> seconds</p>
      </div>
    </div>
  );
};

export default PaymentSuccessPage;
