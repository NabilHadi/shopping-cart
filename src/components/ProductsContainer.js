import ProductCard from "./ProductCard";

const ProductsContainer = ({ products, onAddToCart }) => {
  return (
    <div>
      <ul aria-label="Products list">
        {products ? (
          products.map((product) => {
            return (
              <li key={product.id} aria-label={product.name}>
                <ProductCard product={product} onAddToCartClick={onAddToCart} />
              </li>
            );
          })
        ) : (
          <h2>No products available</h2>
        )}
      </ul>
    </div>
  );
};

export default ProductsContainer;
