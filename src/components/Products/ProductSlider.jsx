import { useRef } from "react";
import ProductCard from "./ProductCard";
import "./products.css";

const ProductSlider = ({ products }) => {
  const ref = useRef(null);

  const slide = dir => {
    ref.current.scrollBy({ left: dir * 1000, behavior: "smooth" });
  };

  return (
    <div className="slider-wrapper">
      <button className="slider-arrow left" onClick={() => slide(-1)}>‹</button>

      <div className="slider-track" ref={ref}>
        {products.slice(0, 10).map(p => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>

      <button className="slider-arrow right" onClick={() => slide(1)}>›</button>
    </div>
  );
};

export default ProductSlider;
