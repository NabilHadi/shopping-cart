import ProductCard from "./ProductCard";

const ProductsContainer = ({ products, onAddToCart }) => {
  if (!products) {
    return (
      <div>
        <h2>No products available</h2>
      </div>
    );
  }

  return (
    <div>
      <ul aria-label="Products list">
        {products.map((product) => {
          return (
            <li key={product.id} aria-label={product.name}>
              <ProductCard product={product} onAddToCartClick={onAddToCart} />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ProductsContainer;
