import { unmountComponentAtNode } from "react-dom";
import { render } from "@testing-library/react";
import Page from "../components/Page";

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

describe("Page", () => {
  it("renders main element", () => {
    const { getByRole } = render(<Page />, { container });

    expect(getByRole("main")).toBeDefined();
  });

  it("renders main element with correct children", () => {
    const { getByText } = render(<Page>Hello world!</Page>, { container });

    expect(getByText("Hello world!")).toBeDefined();
  });

  it("renders main element with correct id and classname", () => {
    const { getByRole } = render(<Page classname=" text-center" id="test1" />, {
      container,
    });

    const main = getByRole("main");

    expect(main.classList.contains("text-center")).toBe(true);
    expect(main.id).toBe("test1");
  });
});
