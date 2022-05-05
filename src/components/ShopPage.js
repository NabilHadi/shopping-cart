import { useState } from "react";
import CartInforBar from "./CartInfoBar";
import Page from "./Page";
import ProductsContainer from "./ProductsContainer";
import ShoppingCart from "./ShoppingCart";

const ShopPage = ({ products }) => {
  const [itemsCount, setItemsCount] = useState(0);
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  const onAddToCartHandler = (product, count) => {
    setItemsCount((items) => items + Number(count));
    setCartItems((prev) => {
      return [...prev, { product, count }];
    });
  };

  const checkoutBtnClickHandler = () => {
    setShowCart(true);
  };

  return (
    <Page id="shoppage">
      <CartInforBar
        itemsCount={itemsCount}
        onCheckout={checkoutBtnClickHandler}
      />
      <ProductsContainer products={products} onAddToCart={onAddToCartHandler} />
      {showCart && <ShoppingCart cartItems={cartItems} />}
    </Page>
  );
};

export default ShopPage;
