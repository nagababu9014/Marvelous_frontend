import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";
// import "./ProductDetailPage.css";
import ProductCard from "../components/Products/ProductCard";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";


const ProductDetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [similarProducts, setSimilarProducts] = useState([]);
const { fetchCartCount } = useCart();
  const navigate = useNavigate();
const [activeImage, setActiveImage] = useState(0);
  // ✅ NEW
  const [qty, setQty] = useState(1);
  const [adding, setAdding] = useState(false);
useEffect(() => {
  setActiveImage(0);
}, [product]);
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
  <div className="bg-gray-100 min-h-screen py-10">
    <div className="max-w-7xl mx-auto px-4 md:px-6">

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 bg-white rounded-2xl shadow-sm p-6 md:p-10">

        {/* ================= IMAGE SECTION ================= */}
        <div className="space-y-4">

          <img
            src={product.images?.[activeImage]?.image}
            alt={product.name}
            className="w-full h-[450px] object-cover rounded-xl"
          />

          {/* Thumbnails */}
          <div className="flex gap-3">
            {product.images?.map((img, index) => (
              <img
                key={index}
                src={img.image}
                alt=""
                onClick={() => setActiveImage(index)}
                className={`h-20 w-20 object-cover rounded-lg cursor-pointer border-2 ${
                  activeImage === index
                    ? "border-black"
                    : "border-transparent"
                }`}
              />
            ))}
          </div>
        </div>

        {/* ================= PRODUCT INFO ================= */}
        <div className="space-y-6">

          <h1 className="text-3xl font-bold">{product.name}</h1>

          {/* Rating */}
          <div className="flex items-center gap-2">
            <span className="text-yellow-500 font-medium">
              ⭐ 4.9
            </span>
            <span className="text-gray-500 text-sm">
              (23 ratings)
            </span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-4">
            <span className="text-3xl font-bold text-green-600">
              ₹{product.price}
            </span>

            {product.mrp && (
              <span className="line-through text-gray-400 text-lg">
                ₹{product.mrp}
              </span>
            )}
          </div>

          {/* Stock */}
          <div>
            {product.stock > 0 ? (
              <span className="text-green-600 font-medium">In Stock</span>
            ) : (
              <span className="text-red-600 font-medium">Out of Stock</span>
            )}
          </div>

          {/* Description */}
          <p className="text-gray-600 leading-relaxed">
            {product.description}
          </p>

          {/* Quantity */}
          <div className="flex items-center gap-4">
            <span className="font-medium">Quantity:</span>
            <div className="flex items-center border rounded-lg overflow-hidden">
              <button
                onClick={() => setQty(q => Math.max(1, q - 1))}
                className="px-3 py-1"
              >
                -
              </button>
              <span className="px-4">{qty}</span>
              <button
                onClick={() => setQty(q => q + 1)}
                className="px-3 py-1"
              >
                +
              </button>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-4 pt-4">
            <button
              onClick={handleAddToCart}
              disabled={adding}
              className="flex-1 bg-black text-white py-3 rounded-xl hover:bg-gray-800 transition"
            >
              {adding ? "Adding..." : "Add to Cart"}
            </button>

            <button
              onClick={handleBuyNow}
              disabled={adding}
              className="flex-1 border border-black py-3 rounded-xl hover:bg-gray-100 transition"
            >
              {adding ? "Processing..." : "Buy Now"}
            </button>
          </div>

          {/* Delivery Info */}
          <div className="border-t pt-6 space-y-2 text-sm text-gray-600">
            <p>🚚 Free delivery</p>
            <p>🔁 7 Days easy return</p>
            <p>💳 Secure payment</p>
          </div>

        </div>
      </div>

      {/* ================= SIMILAR PRODUCTS ================= */}
      {similarProducts.length > 0 && (
        <div className="mt-16">
          <h2 className="text-xl font-semibold mb-8">
            Similar Products
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {similarProducts.map(prod => (
              <ProductCard key={prod.id} product={prod} />
            ))}
          </div>
        </div>
      )}
    </div>
  </div>
);
};

export default ProductDetailPage;
