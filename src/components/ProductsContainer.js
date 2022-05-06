import ProductCard from "./ProductCard";

const ProductsContainer = ({ products, onAddToCart }) => {
  return (
    <div>
      <ul aria-label="Products list" className="grid grid-cols-4 gap-4 p-2">
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
