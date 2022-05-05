const ShoppingCart = ({ cartItems }) => {
  return (
    <div>
      <div aria-label="items count">
        {cartItems.reduce((pre, curr) => {
          return pre + curr.count;
        }, 0)}
      </div>
      {cartItems.map((item) => {
        return (
          <div key={item.product.id}>
            <div>{item.product.pic}</div>
            <div>{item.product.name}</div>
            <div>{item.product.price}</div>
          </div>
        );
      })}
      <div aria-label="total price">
        {cartItems.reduce((pre, curr) => {
          return pre + curr.product.price * curr.count;
        }, 0)}
      </div>
      <button>Pay</button>
    </div>
  );
};

export default ShoppingCart;
