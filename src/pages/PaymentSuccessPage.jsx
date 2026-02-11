import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";
import { useCart } from "../context/CartContext";
import "./PaymentSuccessPage.css";

const PaymentSuccessPage = () => {
  const { orderId } = useParams();
  const { fetchCartCount } = useCart();

  const [seconds, setSeconds] = useState(6); // 🔥 countdown timer

  useEffect(() => {
    let attempts = 0;
    let finished = false;

    // 🔁 Poll backend for webhook completion
    const interval = setInterval(async () => {
      attempts++;

      try {
        const res = await api.get(`orders/${orderId}/`);

        if (res.data.payment_status === "PAID") {
          finished = true;
          clearInterval(interval);
          await fetchCartCount();
        }

        if (attempts >= 10) {
          clearInterval(interval);
        }

      } catch {
        clearInterval(interval);
      }
    }, 1500);

    // ⏱️ Countdown for UI (6 seconds)
const navigate = useNavigate();

const timer = setInterval(() => {
  setSeconds(prev => {
    if (prev <= 1) {
      clearInterval(timer);

      sessionStorage.setItem("forceOrdersReload", "1");

      navigate("/my-orders");   // ✅ correct redirect

      return 0;
    }
    return prev - 1;
  });
}, 1000);



    return () => {
      clearInterval(interval);
      clearInterval(timer);
    };
  }, [orderId]);

  return (
    <div className="success-page">
      <div className="success-card">

        {/* ✅ Spinner */}
        <div className="loader"></div>

        <h2>Payment Successful</h2>
        <p>Confirming your order…</p>
        <p>Please wait <b>{seconds}</b> seconds</p>

      </div>
    </div>
  );
};

export default PaymentSuccessPage;
