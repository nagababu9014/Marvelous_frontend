import { useEffect, useState } from "react";
import api from "../api/axios";
import "./CartPage.css";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import ProductCard from "../components/Products/ProductCard";


const CartPage = () => {
  const [items, setItems] = useState([]);
  const [loadingCheckout, setLoadingCheckout] = useState(false);
  const navigate = useNavigate(); // 🔥 REQUIRED
const loadCart = () => {
  api.get("cart/items/")
    .then(res => {
      const cartItems = res.data.results || res.data || [];
      setItems(cartItems);
      loadRecommendedProducts(cartItems); // 🔥 ADD THIS
    });
};

  const loadRecommendedProducts = async (cartItems) => {
  if (!cartItems.length) {
    setRecommended([]);
    return;
  }

  // pick category from first cart item
  const categoryId = cartItems[0].product_category;

  try {
    const res = await api.get(`products/?category=${categoryId}`);
    const allProducts = res.data.results || res.data || [];

    // remove products already in cart
    const cartProductIds = cartItems.map(i => i.product_id);

    const filtered = allProducts.filter(
      p => !cartProductIds.includes(p.id)
    );

    setRecommended(filtered);
  } catch (err) {
    console.error("Failed to load recommendations");
  }
};

const { fetchCartCount } = useCart();
const [recommended, setRecommended] = useState([]);
  useEffect(loadCart, []);

  const updateQty = (id, qty) => {
    if (qty < 1) return;
api.patch(`cart/update/${id}/`, { quantity: qty })
  .then(() => {
    loadCart();
    fetchCartCount(); // 🔥 update navbar count
  });

  };

  const removeItem = (id) => {
api.delete(`cart/remove/${id}/`)
  .then(() => {
    loadCart();
    fetchCartCount(); // 🔥 update navbar count
  });

  };

  // 🔥 CALCULATE TOTAL
  const totalAmount = items.reduce(
    (sum, item) => sum + item.quantity * parseFloat(item.product_price),
    0
  );

  // 🔥 CHECKOUT
const handleCheckout = () => {
  const isLoggedIn = !!localStorage.getItem("access"); // or auth context

  if (!isLoggedIn) {
    // 🔥 redirect to login with return path
    navigate("/login?next=/checkout");
  } else {
    navigate("/checkout");
  }
};


return (
  <div className="cart-wrapper">

    <div className="cart-container">

      {/* LEFT */}
      <div className="cart-left">
        <h2 className="cart-title">Your Shopping Cart</h2>

        {items.length === 0 && (
          <div className="empty-cart">
            🛒 Your cart is empty
          </div>
        )}

        {items.map(item => (
          <div key={item.id} className="cart-card">
            <img
              src={item.product_image}
              alt={item.product_name}
              className="cart-img"
            />

            <div className="cart-info">
              <h4>{item.product_name}</h4>
              <p className="price">${item.product_price}</p>

              <div className="cart-actions">
                <div className="qty-control">
                  <button onClick={() => updateQty(item.id, item.quantity - 1)}>−</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => updateQty(item.id, item.quantity + 1)}>+</button>
                </div>

                <button
                  className="remove-btn"
                  onClick={() => removeItem(item.id)}
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* RIGHT */}
      {items.length > 0 && (
        <div className="cart-summary">
          <h3>Order Summary</h3>

          <div className="summary-row">
            <span>Subtotal</span>
            <span>${totalAmount.toFixed(2)}</span>
          </div>

          <div className="summary-row">
            <span>Delivery</span>
            <span className="free">FREE</span>
          </div>

          <hr />

          <div className="summary-total">
            <span>Total</span>
            <span>${totalAmount.toFixed(2)}</span>
          </div>

          <button
            className="checkout-btn"
            onClick={handleCheckout}
          >
            Proceed to Checkout
          </button>
        </div>
      )}

    </div>
    {recommended.length > 0 && (
  <div className="similar-products-section">
    <h2>You May Also Like</h2>

    <div className="similar-products-grid">
      {recommended.slice(0, 6).map(prod => (
        <ProductCard key={prod.id} product={prod} />
      ))}
    </div>
  </div>
)}

  </div>
  
);

};

export default CartPage;
