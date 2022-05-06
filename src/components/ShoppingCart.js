const ShoppingCart = ({ cartItems, onPay }) => {
  if (!cartItems) {
    cartItems = [];
  }
  return (
    <div
      data-testid="shopping-cart"
      className=" bg-black/50 fixed top-0 left-0 w-full h-full"
    >
      <div className="relative top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-fit bg-white p-4 border-2 min-w-[20rem] min-h-[18rem]">
        <div className="flex justify-between gap-4 border-b-4 p-2">
          <span>Shopping cart</span>
          <div>
            {cartItems.reduce((pre, curr) => {
              return pre + curr.count;
            }, 0)}{" "}
            items
          </div>
        </div>

        <ul className="flex flex-col gap-2 p-4 max-h-96 overflow-y-auto">
          {cartItems.map((item) => {
            return (
              <li
                key={item.product.id}
                className="flex justify-between gap-4 flex-1 items-center basis-12"
              >
                <div className="flex-1 max-w-[5rem]">{item.product.pic}</div>
                <div>{item.product.name}</div>
                <div>{item.count}</div>
                <div>
                  {item.product.price}
                  <span>$</span>
                </div>
              </li>
            );
          })}
        </ul>
        <div className=" text-right">
          Total:{" "}
          {cartItems.reduce((pre, curr) => {
            return pre + curr.product.price * curr.count;
          }, 0)}
          <span>$</span>
        </div>
        <button onClick={onPay} className=" w-full btn clickable border">
          Pay
        </button>
      </div>
    </div>
  );
};

export default ShoppingCart;
