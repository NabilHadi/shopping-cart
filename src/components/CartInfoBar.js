const CartInforBar = ({ itemsCount, onCheckout }) => {
  return (
    <div aria-label="cart info bar">
      You have <span aria-label="items in cart count">{itemsCount}</span> items
      in your cart
      <button onClick={onCheckout}>Checkout</button>
    </div>
  );
};

export default CartInforBar;
