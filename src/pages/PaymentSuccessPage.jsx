import { useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";
import { useCart } from "../context/CartContext";
import "./PaymentSuccessPage.css";

const PaymentSuccessPage = () => {
  const { orderId } = useParams();
  const { fetchCartCount } = useCart();

  useEffect(() => {
    let attempts = 0;
    let interval;

    const checkOrder = async () => {
      try {
        const res = await api.get(`orders/${orderId}/`);

        if (res.data.payment_status === "PAID") {
          clearInterval(interval);

          // ✅ Update cart after webhook clears it
          await fetchCartCount();

          // ✅ Redirect after cart updated
          window.location.href = "/my-orders";
        }

      } catch (err) {
        console.error("Order check failed:", err);
      }
    };

    interval = setInterval(() => {
      attempts++;
      checkOrder();

      if (attempts >= 10) {
        clearInterval(interval);
        window.location.href = "/my-orders";
      }
    }, 1200);

    return () => clearInterval(interval);

  }, [orderId]);

  return (
    <div className="success-page">
      <div className="success-card">
        <div className="loader"></div>
        <h2>Payment Successful</h2>
        <p>Confirming your order...</p>
      </div>
    </div>
  );
};

export default PaymentSuccessPage;
