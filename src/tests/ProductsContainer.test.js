import { unmountComponentAtNode } from "react-dom";
import { render, within } from "@testing-library/react";
import "@testing-library/jest-dom";
import ProductsContainer from "../components/ProductsContainer";
import Icon from "@mdi/react";
import { mdiAbacus, mdiAbTesting, mdiAccessPoint } from "@mdi/js";
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

const fakeProducts = [
  createProduct({
    productName: "productName1",
    productPic: <Icon role="img" title="Abacus" path={mdiAbacus} />,
  }),
  createProduct({
    productName: "productName2",
    productPic: <Icon role="img" title="Testing" path={mdiAbTesting} />,
  }),
  createProduct({
    productName: "productName3",
    productPic: <Icon role="img" title="AccessPoint" path={mdiAccessPoint} />,
  }),
];

describe("ProductsContainer", () => {
  it("renders no products msg when passed empty products list", () => {
    const { getByText } = render(<ProductsContainer />, { container });

    expect(getByText(/no products available/i)).toBeInTheDocument();
  });

  it("renders correct products list length", () => {
    const { getByRole } = render(
      <ProductsContainer products={fakeProducts} />,
      { container }
    );

    const productsUl = getByRole("list");
    const productsItems = within(productsUl).getAllByRole("listitem");

    expect(productsItems.length).toBe(fakeProducts.length);
  });

  it("renders correct products list items", () => {
    const { getByRole } = render(
      <ProductsContainer products={fakeProducts} />,
      { container }
    );

    getByRole("listitem", { name: `${fakeProducts[0].name}` });
    getByRole("listitem", { name: `${fakeProducts[1].name}` });
    getByRole("listitem", { name: `${fakeProducts[2].name}` });

    getByRole("img", { name: `${fakeProducts[0].pic.props.title}` });
    getByRole("img", { name: `${fakeProducts[1].pic.props.title}` });
    getByRole("img", { name: `${fakeProducts[2].pic.props.title}` });
  });
});
