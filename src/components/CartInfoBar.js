const CartInforBar = ({ itemsCount, onCheckout }) => {
  return (
    <div>
      You have {itemsCount} items in your cart
      <button onClick={onCheckout}>Checkout</button>
    </div>
  );
};

export default CartInforBar;
