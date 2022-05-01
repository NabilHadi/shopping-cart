import ProductCard from "./ProductCard";

const ProductsContainer = ({ products }) => {
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
        {products.map((p) => {
          return (
            <li key={p.id} aria-label={p.productName}>
              <ProductCard
                productId={p.id}
                productName={p.productName}
                productPic={p.productPic}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ProductsContainer;
