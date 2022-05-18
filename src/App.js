import "./styles.css";
import { useState } from "react";

const PRODUCTS = [
  { category: "Fruits", price: "$1", stocked: true, name: "Apple" },
  { category: "Fruits", price: "$1", stocked: true, name: "Dragonfruit" },
  { category: "Fruits", price: "$2", stocked: false, name: "Passionfruit" },
  { category: "Vegetables", price: "$2", stocked: true, name: "Spinach" },
  { category: "Vegetables", price: "$4", stocked: false, name: "Pumpkin" },
  { category: "Vegetables", price: "$1", stocked: true, name: "Peas" }
];

const ProductCategoryRow = ({ category }) => {
  return (
    <tr>
      <th colSpan="2">{category}</th>
    </tr>
  );
};

const ProductRow = ({ product }) => {
  const name = product.stocked ? (
    product.name
  ) : (
    <span style={{ color: "red" }}>{product.name}</span>
  );

  return (
    <tr>
      <td>{name}</td>
      <td>{product.price}</td>
    </tr>
  );
};

const SearchBar = ({
  filterText,
  inStockOnly,
  onFilterTextChange,
  onInStockOnlyChange
}) => {
  return (
    <form>
      <h2>SearchBar</h2>
      <input
        type="text"
        onChange={(e) => onFilterTextChange(e.target.value)}
        value={filterText}
        placeholder="Search..."
      />
      <label>
        <input
          type="checkbox"
          onChange={(e) => onInStockOnlyChange(e.target.checked)}
          checked={inStockOnly}
        />{" "}
        Only show products in stock
      </label>
    </form>
  );
};

const ProductTable = ({ products }) => {
  const rows = [];
  let lastCategory = null;
  products.forEach((product) => {
    if (product.category !== lastCategory) {
      rows.push(
        <ProductCategoryRow
          category={product.category}
          key={product.category}
        />
      );
    }
    rows.push(<ProductRow product={product} key={product.name} />);
    lastCategory = product.category;
  });
  return (
    <div>
      <h2>ProductTable</h2>
      {rows}
    </div>
  );
};

const FilterProductTable = ({ products }) => {
  const [filterText, setFilterText] = useState("");
  const [inStockOnly, setInStockOnly] = useState(false);

  return (
    <div>
      <h1>FilterProductTable</h1>
      <SearchBar
        filterText={filterText}
        inStockOnly={inStockOnly}
        onFilterTextChange={setFilterText}
        onInStockOnlyChange={setInStockOnly}
      />
      <ProductTable
        filterText={filterText}
        inStockOnly={inStockOnly}
        products={products}
      />
    </div>
  );
};
export default function App() {
  return (
    <div>
      <FilterProductTable products={PRODUCTS} />
    </div>
  );
}
