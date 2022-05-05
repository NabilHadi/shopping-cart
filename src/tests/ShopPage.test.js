import { unmountComponentAtNode } from "react-dom";
import { render, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ShopPage from "../components/ShopPage";
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

describe("ShopPage", () => {
  it("renders cart info bar", () => {
    const { getByLabelText } = render(<ShopPage />, { container });

    getByLabelText(/cart info bar/i);
  });

  it("renders Products list", () => {
    const products = getProducts();
    const { getByLabelText } = render(<ShopPage products={products} />, {
      container,
    });

    const productsList = getByLabelText(/products list/i);

    products.forEach((p) => {
      within(productsList).getByRole("listitem", { name: p.name });
    });
  });

  it("clicking on add to cart button for a product changes items count in cart info bar", () => {
    const products = getProducts();
    const { getByLabelText } = render(<ShopPage products={products} />, {
      container,
    });

    const itemsCartCount = getByLabelText(/items in cart count/i);
    const productsList = getByLabelText(/products list/i);

    const firstProduct = within(productsList).getByRole("listitem", {
      name: products[0].name,
    });

    userEvent.type(
      within(firstProduct).getByRole("textbox", { name: /product count/i }),
      "{selectall}{backspace}12"
    );
    userEvent.click(
      within(firstProduct).getByRole("button", { name: /add to cart/i })
    );

    expect(itemsCartCount.textContent).toMatch(/12/i);

    userEvent.type(
      within(firstProduct).getByRole("textbox", { name: /product count/i }),
      "{selectall}{backspace}10"
    );
    userEvent.click(
      within(firstProduct).getByRole("button", { name: /add to cart/i })
    );
    expect(itemsCartCount.textContent).toMatch(/22/i);
  });
});
