import { useState } from "react";
import CartInforBar from "./CartInfoBar";
import Page from "./Page";
import ProductsContainer from "./ProductsContainer";
import ShoppingCart from "./ShoppingCart";

const ShopPage = ({ products }) => {
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  const onAddToCartHandler = (product, count) => {
    setCartItems((prevCartItems) => {
      // find if the product is already in cart
      const itemInCart = prevCartItems.find(
        (item) => item.product.id === product.id
      );

      // if product is found in cart update the count
      if (itemInCart) {
        return prevCartItems.map((item) => {
          if (item.product.id === itemInCart.product.id) {
            return { ...item, count: item.count + count };
          }
          return item;
        });
      }

      // else add the product to cart
      return [...prevCartItems, { product, count }];
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
        itemsCount={cartItems.reduce((prev, next) => {
          return prev + next.count;
        }, 0)}
        onCheckout={checkoutBtnClickHandler}
      />
      <ProductsContainer products={products} onAddToCart={onAddToCartHandler} />
      {showCart && <ShoppingCart cartItems={cartItems} onPay={payBtnHandler} />}
    </Page>
  );
};

export default ShopPage;
