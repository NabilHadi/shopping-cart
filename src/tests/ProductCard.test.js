import { unmountComponentAtNode } from "react-dom";
import { render } from "@testing-library/react";
import ProductCard from "../components/ProductCard";
import userEvent from "@testing-library/user-event";
import Icon from "@mdi/react";
import { mdiAbacus } from "@mdi/js";
import { createProduct } from "../ProductFactory";

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

const fakeProduct = createProduct({
  productName: "test1",
  productPic: <Icon role="img" title="Abacus" path={mdiAbacus} />,
});

describe("ProductCard", () => {
  it("renders a card with correct information", () => {
    const { getByText, getByRole } = render(
      <ProductCard product={fakeProduct} />,
      {
        container,
      }
    );

    expect(getByText("test1")).toBeDefined();
    expect(getByRole("img", { name: "Abacus" })).toBeDefined();
  });

  it("renders input element with value of 1", () => {
    const { getByRole } = render(<ProductCard product={fakeProduct} />, {
      container,
    });

    expect(getByRole("textbox", { name: /product count/i }).value).toMatch(/1/);
  });

  it("input element accepts only positve numbers", () => {
    const { getByRole } = render(<ProductCard product={fakeProduct} />, {
      container,
    });

    const input = getByRole("textbox");

    userEvent.type(input, "{selectall}{backspace}hello");
    expect(getByRole("textbox", { name: /product count/i }).value).toMatch(
      /^$/
    );

    userEvent.type(input, "3");
    expect(getByRole("textbox", { name: /product count/i }).value).toMatch(
      /^\b3\b$/
    );

    userEvent.type(input, "faa");
    expect(getByRole("textbox", { name: /product count/i }).value).toMatch(
      /^\b3\b$/
    );

    userEvent.type(input, "{selectall}{backspace}7");
    expect(getByRole("textbox", { name: /product count/i }).value).toMatch(
      /^7$/
    );
  });

  it("renders increase and decrease button", () => {
    const { getByRole } = render(<ProductCard product={fakeProduct} />, {
      container,
    });

    const increaseBtn = getByRole("button", {
      name: /increase product count/i,
    });
    const decreaseBtn = getByRole("button", {
      name: /decrease product count/i,
    });

    expect(increaseBtn).toBeDefined();
    expect(decreaseBtn).toBeDefined();
  });

  it("clicking increase and decrease buttons changes the product count", () => {
    const { getByRole } = render(<ProductCard product={fakeProduct} />, {
      container,
    });

    const productCountInput = getByRole("textbox", { name: /product count/i });
    const increaseBtn = getByRole("button", {
      name: /increase product count/i,
    });
    const decreaseBtn = getByRole("button", {
      name: /decrease product count/i,
    });

    let currentValue = Number(productCountInput.value);
    userEvent.click(increaseBtn);
    expect(Number(productCountInput.value)).toBe(currentValue + 1);

    currentValue = Number(productCountInput.value);
    userEvent.dblClick(increaseBtn);
    expect(Number(productCountInput.value)).toBe(currentValue + 2);

    currentValue = Number(productCountInput.value);
    userEvent.dblClick(decreaseBtn);
    expect(Number(productCountInput.value)).toBe(currentValue - 2);
  });

  it("count doesn't go below 1 when clicking decrease btn", () => {
    const { getByRole } = render(<ProductCard product={fakeProduct} />, {
      container,
    });

    const productCountInput = getByRole("textbox", { name: /product count/i });
    const decreaseBtn = getByRole("button", {
      name: /decrease product count/i,
    });

    userEvent.type(productCountInput, "{selectall}{backspace}1");

    userEvent.dblClick(decreaseBtn);
    expect(Number(productCountInput.value)).toBe(1);
  });

  it("clicking decrease button when count is empty sets it to 1", () => {
    const { getByRole } = render(<ProductCard product={fakeProduct} />, {
      container,
    });

    const productCountInput = getByRole("textbox", { name: /product count/i });
    const decreaseBtn = getByRole("button", {
      name: /decrease product count/i,
    });

    userEvent.type(productCountInput, "{selectall}{backspace}");

    userEvent.dblClick(decreaseBtn);
    expect(Number(productCountInput.value)).toBe(1);
  });

  it("renders Add to cart button", () => {
    const { getByRole } = render(<ProductCard product={fakeProduct} />, {
      container,
    });

    const addToCartBtn = getByRole("button", { name: /add to cart/i });

    expect(addToCartBtn).toBeDefined();
  });

  it("clicking add to cart button resets product count to 1", () => {
    const { getByRole } = render(<ProductCard product={fakeProduct} />, {
      container,
    });

    const addToCartBtn = getByRole("button", { name: /add to cart/i });
    const productCountInput = getByRole("textbox", { name: /product count/i });

    userEvent.type(productCountInput, "{selectall}{backspace}3");
    expect(productCountInput.value).toMatch(/^\b3\b$/);

    userEvent.click(addToCartBtn);
    expect(productCountInput.value).toMatch(/^\b1\b$/);
  });

  it("clicking add to cart button calls addToCart callback function", () => {
    const onAddToCartClickMock = jest.fn();
    const { getByRole } = render(
      <ProductCard
        product={fakeProduct}
        onAddToCartClick={onAddToCartClickMock}
      />,
      {
        container,
      }
    );

    const addToCartBtn = getByRole("button", { name: /add to cart/i });

    expect(onAddToCartClickMock).toBeCalledTimes(0);
    userEvent.click(addToCartBtn);
    expect(onAddToCartClickMock).toBeCalledTimes(1);
  });

  it("clicking add to cart button calls addToCart callback function with correct arguments", () => {
    const onAddToCartClickMock = jest.fn();
    const { getByRole } = render(
      <ProductCard
        product={fakeProduct}
        onAddToCartClick={onAddToCartClickMock}
      />,
      {
        container,
      }
    );

    const addToCartBtn = getByRole("button", { name: /add to cart/i });

    const productCountInput = getByRole("textbox", { name: /product count/i });
    userEvent.type(productCountInput, "{selectall}{backspace}1");
    userEvent.click(addToCartBtn);
    expect(onAddToCartClickMock).toHaveBeenNthCalledWith(1, fakeProduct, 1);

    userEvent.type(productCountInput, "{selectall}{backspace}12");
    userEvent.click(addToCartBtn);
    expect(onAddToCartClickMock).toHaveBeenNthCalledWith(2, fakeProduct, 12);
  });

  it("clicking add to cart button when input is empty or 0 does not call addToCart function", () => {
    const onAddToCartClickMock = jest.fn();
    const { getByRole } = render(
      <ProductCard
        product={fakeProduct}
        onAddToCartClick={onAddToCartClickMock}
      />,
      {
        container,
      }
    );

    const addToCartBtn = getByRole("button", { name: /add to cart/i });

    const productCountInput = getByRole("textbox", { name: /product count/i });

    userEvent.type(productCountInput, "{selectall}{backspace}");
    userEvent.click(addToCartBtn);
    expect(onAddToCartClickMock).not.toHaveBeenCalled();

    userEvent.type(productCountInput, "{selectall}{backspace}0");
    userEvent.click(addToCartBtn);
    expect(onAddToCartClickMock).not.toHaveBeenCalled();
  });
});
