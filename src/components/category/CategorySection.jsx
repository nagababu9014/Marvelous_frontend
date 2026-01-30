import { useEffect, useState } from "react";
import api from "../../api/axios";
import ProductSlider from "../Products/ProductSlider";
import CategoryHeader from "./CategoryHeader";
import "./categorySection.css";   // ✅ ADD THIS LINE
const CategorySection = ({ category }) => {
  const [products, setProducts] = useState([]);

useEffect(() => {
  api
    .get(`products/?category=${category.id}`)
    .then(res => {
      const products = Array.isArray(res.data)
        ? res.data               // ✅ non-paginated
        : res.data.results || []; // ✅ paginated
      setProducts(products);
    });
}, [category.id]);



  return (
    <section className="category-section">
      <CategoryHeader category={category} />
      <ProductSlider products={products} />
    </section>
  );
};

export default CategorySection;
