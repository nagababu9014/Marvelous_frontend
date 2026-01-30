import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";
import "./CategoryPage.css";
import { useLocation } from "react-router-dom";

import SubCategoryFilter from "../components/filters/SubCategoryFilter";
import ProductGrid from "../components/Products/ProductGrid";

const CategoryPage = () => {
const { id: slug } = useParams();
  const [products, setProducts] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [categoryId, setCategoryId] = useState(null); // ✅ REQUIRED
  const location = useLocation();


useEffect(() => {
  if (location.state?.subcategoryId) {
    handleFilter(location.state.subcategoryId);
  }
}, [location.state, categoryId]);

useEffect(() => {
  const loadData = async () => {
    try {
      const catRes = await api.get(`categories/?slug=${slug}`);

      if (!Array.isArray(catRes.data)) {
        console.error("Invalid category response");
        return;
      }

      const category = catRes.data.find(c => c.slug === slug);

      if (!category) {
        console.error("Category not found for slug:", slug);
        return;
      }

      const catId = category.id;
      setCategoryId(catId);

      const prodRes = await api.get(`products/?category=${catId}`);
      setProducts(prodRes.data.results || prodRes.data || []);

      const subRes = await api.get(`subcategories/?category=${catId}`);
      setSubcategories(subRes.data.results || subRes.data || []);

    } catch (err) {
      console.error("Category page error:", err);
    }
  };

  if (slug) loadData();
}, [slug]);





const handleFilter = (subId) => {
  if (!categoryId && !subId) return;

  const url = subId
    ? `products/?subcategory=${subId}`
    : `products/?category=${categoryId}`;

  api.get(url).then(res =>
    setProducts(res.data.results || res.data || [])
  );
};


  return (
    <div className="category-page">
      <SubCategoryFilter
        subcategories={subcategories}
        onSelect={handleFilter}
      />
      <ProductGrid products={products} />
    </div>
  );
};

export default CategoryPage;
