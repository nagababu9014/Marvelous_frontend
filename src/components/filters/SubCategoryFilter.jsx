const SubCategoryFilter = ({ subcategories, onSelect }) => {
  return (
    <aside className="filters">
      <h3>Subcategories</h3>

      <button onClick={() => onSelect(null)}>
        All
      </button>

      {subcategories.map(sub => (
        <button
          key={sub.id}
          onClick={() => onSelect(sub.id)}
        >
          {sub.name}
        </button>
      ))}
    </aside>
  );
};
export default SubCategoryFilter;