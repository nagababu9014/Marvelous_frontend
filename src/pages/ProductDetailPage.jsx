import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";
import "./ProductDetailPage.css";
import ProductCard from "../components/Products/ProductCard";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";


const ProductDetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [similarProducts, setSimilarProducts] = useState([]);
const { fetchCartCount } = useCart();
  const navigate = useNavigate();

  // ✅ NEW
  const [qty, setQty] = useState(1);
  const [adding, setAdding] = useState(false);

  useEffect(() => {
    api.get(`products/${id}/`)
      .then(res => {
        setProduct(res.data);
        return api.get(`products/?category=${res.data.category}`);
      })
      .then(res => {
        const filtered = (res.data.results || res.data || []).filter(
          p => p.id !== parseInt(id)
        );
        setSimilarProducts(filtered);
      });
  }, [id]);

  // ✅ NEW: Add to cart function
const handleAddToCart = async () => {
  setAdding(true);
  try {
    await api.post("cart/add/", {
      product: product.id,
      quantity: qty,
    });

    await fetchCartCount();
    alert("Added to cart");

  } catch (err) {
    // ❌ NO error alert
    await fetchCartCount();
  }
  setAdding(false);
};

const handleBuyNow = async () => {
  setAdding(true);
  try {
    await api.post("cart/add/", {
      product: product.id,
      quantity: qty,
    });

    await fetchCartCount();

  } catch (err) {
    // ❌ IGNORE ERROR (item already exists)
  }

  navigate("/cart");   // ✅ ALWAYS GO TO CART
  setAdding(false);
};


  if (!product) {
    return <p className="loading">Loading product...</p>;
  }

  return (
    <>
      <div className="product-detail-page">

        <div className="product-image-section">
          <img src={product.image} alt={product.name} />
        </div>

        <div className="product-info-section">
          <h1 className="product-title">{product.name}</h1>
          <p className="product-desc">{product.description}</p>

          <div className="price-box">
            <span className="price">${product.price}</span>
            {product.mrp && <span className="mrp">₹{product.mrp}</span>}
          </div>
        </div>

        <div className="product-buy-box">

          {/* ✅ NEW: Quantity controls (unstyled) */}
<div className="qty-control">
  <button onClick={() => setQty(q => Math.max(1, q - 1))}>−</button>
  <span>{qty}</span>
  <button onClick={() => setQty(q => q + 1)}>+</button>
</div>


          <button
            className="add-cart"
            onClick={handleAddToCart}
            disabled={adding}
          >
            {adding ? "Adding..." : "Add to Cart"}
          </button>

          <button
  className="buy-now"
  onClick={handleBuyNow}
  disabled={adding}
>
  {adding ? "Processing..." : "Buy Now"}
</button>

        </div>
      </div>

      {similarProducts.length > 0 && (
        <div className="similar-products-section">
          <h2>Similar Products</h2>
          <div className="similar-products-grid">
            {similarProducts.map(prod => (
              <ProductCard key={prod.id} product={prod} />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default ProductDetailPage;
