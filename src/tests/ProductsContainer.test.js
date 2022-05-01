import { unmountComponentAtNode } from "react-dom";
import { render } from "@testing-library/react";
import ProductsContainer from "../components/ProductsContainer";
import Icon from "@mdi/react";
import { mdiAbacus, mdiAbTesting, mdiAccessPoint } from "@mdi/js";

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

const fakeProducts = [
  {
    id: 1,
    productName: "productName1",
    productPic: <Icon role="img" title="Abacus" path={mdiAbacus} />,
  },
  {
    id: 2,
    productName: "productName2",
    productPic: <Icon role="img" title="Testing" path={mdiAbTesting} />,
  },
  {
    id: 3,
    productName: "productName3",
    productPic: <Icon role="img" title="AccessPoint" path={mdiAccessPoint} />,
  },
];

describe("ProductsContainer", () => {
  it("renders no products msg when passed empty products list", () => {
    const { getByRole } = render(<ProductsContainer />, { container });

    const noProductsMsg = getByRole("heading");

    expect(noProductsMsg.textContent).toMatch(/no products available/i);
  });

  it("renders correct products list length", () => {
    const { getAllByRole } = render(
      <ProductsContainer products={fakeProducts} />,
      { container }
    );

    const productsList = getAllByRole("listitem");

    expect(productsList.length).toBe(fakeProducts.length);
  });

  it("renders correct products list items", () => {
    const { getByText, getByRole } = render(
      <ProductsContainer products={fakeProducts} />,
      { container }
    );

    getByText("productName1");
    getByRole("img", { name: /Abacus/i });
    getByText("productName2");
    getByRole("img", { name: /Testing/i });
    getByText("productName3");
    getByRole("img", { name: /AccessPoint/i });
  });
});
