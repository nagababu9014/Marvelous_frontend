import React from "react";
import ReactDOM from "react-dom/client";
import { CartProvider } from "./context/CartContext";
import { LoaderProvider } from "./context/LoaderContext";
import { Toaster } from "react-hot-toast";

// 🔥 STRIPE
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import AppWrapper from "./AppWrapper";

const stripePromise = loadStripe(
  import.meta.env.VITE_STRIPE_PUBLIC_KEY
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <LoaderProvider>
      <Elements stripe={stripePromise}>
        <CartProvider>
          <Toaster position="top-right" reverseOrder={false} />
          <AppWrapper />
        </CartProvider>
      </Elements>
    </LoaderProvider>
  </React.StrictMode>
);
