import { useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "../../api/axios";
import { useCart } from "../../context/CartContext";
import "./products.css";
import toast from "react-hot-toast";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const { fetchCartCount } = useCart();
const isOutOfStock = product.stock === 0;

  const [qty, setQty] = useState(1);
  const [adding, setAdding] = useState(false);

  const handleAddToCart = async (e) => {
    e.stopPropagation(); // ✅ prevent bubbling
    if (adding) return;  // ✅ hard guard

    setAdding(true);

    try {
      await api.post("cart/add/", {
        product: product.id,
        quantity: qty,
        guest_id: localStorage.getItem("guest_id"),
      });

      fetchCartCount();

      toast.custom(
        (t) => (
          <div className="cart-toast">
            <div className="cart-toast-text">
              <strong>{product.name}</strong>
              <p>Added to cart</p>
            </div>

            <button
              className="view-cart-btn"
              onClick={() => {
                toast.dismiss(t.id);
                navigate("/cart");
              }}
            >
              View Cart
            </button>
          </div>
        ),
        {
          id: "add-to-cart-toast", // ✅ prevents duplicates
          duration: 4000,
        }
      );
    } catch (err) {
      console.error(err.response?.data || err);
      toast.error("Failed to add to cart");
    } finally {
      setAdding(false);
    }
  };

  return (
    <div className="product-card-minimal">

      {/* IMAGE (clickable) */}
     <div
  className={`product-image ${isOutOfStock ? "out-of-stock" : ""}`}
  onClick={() => navigate(`/product/${product.id}`)}
>
  <img
    src={
      product.images?.length > 0
        ? product.images[0].image
        : "/placeholder.png"
    }
    alt={product.name}
  />

  {isOutOfStock && (
    <div className="out-of-stock-badge">
      OUT OF STOCK
    </div>
  )}
</div>



      {/* CONTENT */}
      <div className="product-content">

        {/* TITLE (clickable) */}
        <div
          className="product-title-row"
          onClick={() => navigate(`/product/${product.id}`)}
        >
          <div className="product-title">{product.name}</div>
          
        </div>

        <div className="product-subtitle">
          {product.description?.slice(0, 45) || "Premium Product"}
        </div>

        {/* PRICE + QTY */}
        <div className="price-qty-row">
          <div className="price-row">
            <span className="price">${product.price}</span>
            {product.mrp && <span className="mrp">${product.mrp}</span>}
          </div>

          <div
            className="qty-row"
            onClick={(e) => e.stopPropagation()}
          >
<button
  disabled={isOutOfStock}
  onClick={() => setQty(q => Math.max(1, q - 1))}
>
  −
</button>

<span>{qty}</span>

<button
  disabled={isOutOfStock}
  onClick={() => setQty(q => q + 1)}
>
  +
</button>

          </div>
        </div>

        {/* ADD TO CART */}
<button
  className="add-to-cart-btn"
  onClick={handleAddToCart}
  disabled={adding || isOutOfStock}
>
  {isOutOfStock ? "Out of Stock" : adding ? "Adding..." : "Add to Cart"}
</button>

      </div>
    </div>
  );
};

export default ProductCard;
