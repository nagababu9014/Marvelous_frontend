import { useNavigate } from "react-router-dom";

const CategoryHeader = ({ category }) => {
  const navigate = useNavigate();

  return (
    <div className="category-header">
      <h2>{category.name}</h2>
<button onClick={() => navigate(`/category/${category.slug}`)}>
  View More
</button>

    </div>
  );
};

export default CategoryHeader;
