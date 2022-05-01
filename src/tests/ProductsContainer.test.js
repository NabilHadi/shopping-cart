import { unmountComponentAtNode } from "react-dom";
import { render, within } from "@testing-library/react";
import "@testing-library/jest-dom";
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

    getByRole("listitem", { name: `${fakeProducts[0].productName}` });
    getByRole("listitem", { name: `${fakeProducts[1].productName}` });
    getByRole("listitem", { name: `${fakeProducts[2].productName}` });

    getByRole("img", { name: `${fakeProducts[0].productPic.props.title}` });
    getByRole("img", { name: `${fakeProducts[1].productPic.props.title}` });
    getByRole("img", { name: `${fakeProducts[2].productPic.props.title}` });
  });
});
