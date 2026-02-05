import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios";
import "./PaymentPage.css";
import { useCart } from "../context/CartContext";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";



const PaymentPage = () => {
  const [checkout, setCheckout] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
const { fetchCartCount } = useCart();
const stripe = useStripe();
const elements = useElements();
const [cardError, setCardError] = useState("");

  useEffect(() => {
    api.get("cart/checkout/")
      .then(res => {
        setCheckout(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

const { orderId } = useParams();

const payNow = async () => {
  if (!stripe || !elements) return;

  // 1️⃣ Create PaymentIntent
  const res = await api.post("payments/create-intent/", {
    order_id: orderId
  });

  const clientSecret = res.data.client_secret;

  // 2️⃣ Confirm card payment
  const result = await stripe.confirmCardPayment(clientSecret, {
    payment_method: {
      card: elements.getElement(CardElement),
    },
  });

  if (result.error) {
    alert(result.error.message);
    return;
  }

  // ✅ Payment succeeded
    if (result.paymentIntent.status === "succeeded") {
      await fetchCartCount();   // 🔥 update cart context
      navigate(`/payment-success/${orderId}`);
    }

};







  if (loading) return <p>Loading payment...</p>;
  if (!checkout) return <p>No checkout data</p>;

  return (
    <div className="payment-page">
      <h2>Payment</h2>

      {/* ORDER SUMMARY */}
      <div className="payment-box">
        <h3>Order Summary</h3>

        {checkout.items.map((item, i) => (
          <div key={i}>
            <p>
              {item.product} × {item.quantity} — ${item.subtotal}
            </p>
          </div>
        ))}

        <hr />

        <p><b>Total:</b> ${checkout.total_amount}</p>
      </div>
        <div className="payment-box">
  <h3>Card Details</h3>
  <CardElement
  onChange={(event) => {
    if (event.error) {
      setCardError(event.error.message);
    } else {
      setCardError("");
    }
  }}
/>
{cardError && (
  <div className="card-error">
    {cardError}
  </div>
)}

</div>

      {/* PAY BUTTON */}
<button className="pay-now-btn" onClick={payNow} disabled={!stripe}>
  Pay Now
</button>

    </div>
  );
};

export default PaymentPage;
