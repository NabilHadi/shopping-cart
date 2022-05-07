import { unmountComponentAtNode } from "react-dom";
import { render, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ShopPage from "../components/ShopPage";
import getProducts from "../products";
import "@testing-library/jest-dom";

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

  it.only("clicking on add to cart button for a product changes items count in cart info bar", () => {
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
      "{selectall}{backspace}1"
    );
    userEvent.click(
      within(firstProduct).getByRole("button", { name: /add to cart/i })
    );

    expect(itemsCartCount.textContent).toMatch(/13/i);

    const secondProduct = within(productsList).getByRole("listitem", {
      name: products[1].name,
    });

    userEvent.type(
      within(secondProduct).getByRole("textbox", { name: /product count/i }),
      "{selectall}{backspace}3"
    );
    userEvent.click(
      within(secondProduct).getByRole("button", { name: /add to cart/i })
    );

    expect(itemsCartCount.textContent).toMatch(/16/i);
  });

  it("shopping cart is not visible by default", () => {
    const products = getProducts();
    const { queryByTestId } = render(<ShopPage products={products} />, {
      container,
    });

    expect(queryByTestId("shopping-cart")).toBeNull();
  });

  it("clicking on checkout button shows shopping cart", () => {
    const products = getProducts();
    const { getByRole, getByTestId } = render(
      <ShopPage products={products} />,
      {
        container,
      }
    );

    const checkoutBtn = getByRole("button", { name: /checkout/i });

    userEvent.click(checkoutBtn);

    expect(getByTestId("shopping-cart")).toBeInTheDocument();
  });

  it("shows correct items on cart when checkout button is clicked", () => {
    const products = getProducts();
    const { getByLabelText, getByRole, getByTestId } = render(
      <ShopPage products={products} />,
      {
        container,
      }
    );

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

    userEvent.click(getByRole("button", { name: /checkout/i }));

    const shoppingCart = getByTestId("shopping-cart");

    within(shoppingCart).getByText(/12 items/i);
    within(shoppingCart).getAllByText(products[0].name);
    within(shoppingCart).getByRole("img", { name: products[0].name });
    within(shoppingCart).getByText(
      new RegExp(`total:\\s*${products[0].price * 12}`, "i")
    );
  });
});
