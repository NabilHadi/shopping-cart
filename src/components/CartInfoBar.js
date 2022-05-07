const CartInforBar = ({ itemsCount, onCheckout }) => {
  return (
    <div
      aria-label="cart info bar"
      className="p-4 flex justify-around items-center text-lg border-b shadow-sm"
    >
      <div>
        You have{" "}
        <span aria-label="items in cart count" className=" font-bold">
          {itemsCount}
        </span>{" "}
        items in your cart
      </div>
      <button
        onClick={onCheckout}
        className=" bg-neutral-800 text-white clickable btn"
      >
        Checkout
      </button>
    </div>
  );
};

export default CartInforBar;
