import { createContext, useContext, useEffect, useState } from "react";
import api from "../api/axios";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartCount, setCartCount] = useState(0);

  const fetchCartCount = async () => {
    try {
      const res = await api.get("cart/items/");
      const items = res.data.results || res.data || [];
      const total = items.reduce((sum, item) => sum + item.quantity, 0);
      setCartCount(total);
    } catch (err) {
      console.error("Cart count error", err);
    }
  };

useEffect(() => {
  fetchCartCount();
}, []);


  return (
    <CartContext.Provider value={{ cartCount, fetchCartCount }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
