const ShoppingCart = ({ cartItems }) => {
  if (!cartItems) {
    cartItems = [];
  }
  return (
    <div data-testid="shopping-cart">
      <div>
        {cartItems.reduce((pre, curr) => {
          return pre + curr.count;
        }, 0)}{" "}
        items
      </div>
      <ul>
        {cartItems.map((item) => {
          return (
            <li key={item.product.id}>
              <div>{item.product.pic}</div>
              <div>{item.product.name}</div>
              <div>{item.product.price}</div>
            </li>
          );
        })}
      </ul>
      <div>
        Total:
        {cartItems.reduce((pre, curr) => {
          return pre + curr.product.price * curr.count;
        }, 0)}
      </div>
      <button>Pay</button>
    </div>
  );
};

export default ShoppingCart;
