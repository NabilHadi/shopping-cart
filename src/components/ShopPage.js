import { useState } from "react";
import CartInforBar from "./CartInfoBar";
import Page from "./Page";
import ProductsContainer from "./ProductsContainer";
import ShoppingCart from "./ShoppingCart";

const ShopPage = ({ products }) => {
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  const onAddToCartHandler = (product, count) => {
    setCartItems((prev) => {
      return [...prev, { product, count }];
    });
  };

  const checkoutBtnClickHandler = () => {
    setShowCart(true);
  };

  const payBtnHandler = () => {
    setShowCart(false);
    setCartItems([]);
  };
  return (
    <Page id="shoppage" classname=" flex flex-col mb-4 shadow-md">
      <CartInforBar
        itemsCount={cartItems.length}
        onCheckout={checkoutBtnClickHandler}
      />
      <ProductsContainer products={products} onAddToCart={onAddToCartHandler} />
      {showCart && <ShoppingCart cartItems={cartItems} onPay={payBtnHandler} />}
    </Page>
  );
};

export default ShopPage;
