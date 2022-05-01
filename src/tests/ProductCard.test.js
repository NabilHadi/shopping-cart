import { unmountComponentAtNode } from "react-dom";
import { render } from "@testing-library/react";
import ProductCard from "../components/ProductCard";
import userEvent from "@testing-library/user-event";
import Icon from "@mdi/react";
import { mdiAbacus } from "@mdi/js";

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

describe("ProductCard", () => {
  it("renders a card with correct information", () => {
    const { getByText, getByRole } = render(
      <ProductCard
        productName="test1"
        productPic={<Icon role="img" title="Abacus" path={mdiAbacus} />}
        productAlt="testAlt"
      />,
      { container }
    );

    expect(getByText("test1")).toBeDefined();
    expect(getByRole("img", { name: "Abacus" })).toBeDefined();
  });

  it("renders input element with value of 1", () => {
    const { getByRole } = render(<ProductCard />, {
      container,
    });

    expect(getByRole("textbox", { name: /product count/i }).value).toMatch(/1/);
  });

  it("input element accepts only positve numbers", () => {
    const { getByRole } = render(<ProductCard />, { container });

    const input = getByRole("textbox");

    userEvent.type(input, "{selectall}{backspace}hello1");
    expect(getByRole("textbox", { name: /product count/i }).value).toMatch(
      /^\b1\b$/
    );

    userEvent.type(input, "3");
    expect(getByRole("textbox", { name: /product count/i }).value).toMatch(
      /^\b13\b$/
    );

    userEvent.type(input, "faa");
    expect(getByRole("textbox", { name: /product count/i }).value).toMatch(
      /^\b13\b$/
    );

    userEvent.type(input, "{selectall}{backspace}0");
    expect(getByRole("textbox", { name: /product count/i }).value).toMatch(
      /^$/
    );
  });

  it("renders increase and decrease button", () => {
    const { getByRole } = render(<ProductCard />, { container });

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
    const { getByRole } = render(<ProductCard />, { container });

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
    const { getByRole } = render(<ProductCard />, { container });

    const productCountInput = getByRole("textbox", { name: /product count/i });
    const decreaseBtn = getByRole("button", {
      name: /decrease product count/i,
    });

    userEvent.type(productCountInput, "{selectall}{backspace}1");

    userEvent.dblClick(decreaseBtn);
    expect(Number(productCountInput.value)).toBe(1);
  });

  it("renders Add to cart button", () => {
    const { getByRole } = render(<ProductCard />, { container });

    const addToCartBtn = getByRole("button", { name: /add to cart/i });

    expect(addToCartBtn).toBeDefined();
  });

  it("clicking add to cart button resets product count to 1", () => {
    const { getByRole } = render(<ProductCard />, { container });

    const addToCartBtn = getByRole("button", { name: /add to cart/i });
    const productCountInput = getByRole("textbox", { name: /product count/i });

    userEvent.type(productCountInput, "{selectall}{backspace}3");
    expect(productCountInput.value).toMatch(/^\b3\b$/);

    userEvent.click(addToCartBtn);
    expect(productCountInput.value).toMatch(/^\b1\b$/);
  });
});
