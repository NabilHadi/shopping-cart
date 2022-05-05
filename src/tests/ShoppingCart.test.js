import { unmountComponentAtNode } from "react-dom";
import { render } from "@testing-library/react";
import ShoppingCart from "../components/ShoppingCart";
import getProducts from "../products";

let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

const cartItems = [
  { product: getProducts()[0], count: 4 },
  { product: getProducts()[1], count: 1 },
  { product: getProducts()[2], count: 2 },
];

describe("ShoppingCart", () => {
  it("renders correct Items count", () => {
    const { getByText } = render(<ShoppingCart cartItems={cartItems} />, {
      container,
    });

    getByText(/7 items/i);
  });

  it("renders products with correct info", () => {
    const { getByRole, getAllByText, getByText } = render(
      <ShoppingCart cartItems={cartItems} />,
      {
        container,
      }
    );

    cartItems.forEach((item) => {
      getByRole("img", { name: item.product.name });
      getAllByText(item.product.name);
      getByText(item.product.price);
    });
  });

  it("renders correct total", () => {
    const { getByText } = render(<ShoppingCart cartItems={cartItems} />, {
      container,
    });

    const totalPrice = cartItems.reduce((pre, curr) => {
      return pre + curr.count * curr.product.price;
    }, 0);

    getByText(new RegExp(`total:\\s*${totalPrice}`, "i"));
  });

  it("renders pay button", () => {
    const { getByRole } = render(<ShoppingCart cartItems={cartItems} />, {
      container,
    });
    getByRole("button", { name: /pay/i });
  });
});
