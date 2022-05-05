import { useState } from "react";
import CartInforBar from "./CartInfoBar";
import Page from "./Page";
import ProductsContainer from "./ProductsContainer";

const ShopPage = ({ products }) => {
  const [itemsCount, setItemsCount] = useState(0);

  const onAddToCartHandler = (product, count) => {
    setItemsCount((items) => items + Number(count));
  };

  return (
    <Page id="shoppage">
      <CartInforBar itemsCount={itemsCount} />
      <ProductsContainer products={products} onAddToCart={onAddToCartHandler} />
    </Page>
  );
};

export default ShopPage;
