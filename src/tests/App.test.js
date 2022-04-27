import { unmountComponentAtNode } from "react-dom";
import { render, screen } from "@testing-library/react";
import App from "../App";

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

describe("App", () => {
  it("renders home and shop links", () => {
    render(<App />);

    const link = screen.getAllByRole("link");

    expect(link[0].textContent).toMatch(/home/i);
    expect(link[1].textContent).toMatch(/shop/i);
  });
});
