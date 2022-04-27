import { unmountComponentAtNode } from "react-dom";
import { render, screen } from "@testing-library/react";
import App from "../App";
import Homepage from "../components/Homepage";
import userEvent from "@testing-library/user-event";

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
    const { getAllByRole } = render(<App />, { container });

    const links = getAllByRole("link");

    expect(links[0].textContent).toMatch(/home/i);
    expect(links[1].textContent).toMatch(/shop/i);
  });

  it("renders homepage by default", () => {
    render(<App />, { container });

    const main = screen.getByRole("main");

    expect(main.id).toMatch("homepage");
  });

  it("renders shop page when shop link is clicked", () => {
    render(<App />, { container });

    const shopPageLink = screen.getByRole("link", { name: /shop/i });

    userEvent.click(shopPageLink);

    const main = screen.getByRole("main");

    expect(main.id).toMatch("shoppage");
  });
});
