import { unmountComponentAtNode } from "react-dom";
import { render, screen } from "@testing-library/react";
import App from "../App";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";

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
  it("renders header with ICONS word", () => {
    const { getByRole } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
      { container }
    );

    const header = getByRole("heading");

    expect(header.textContent).toMatch(/icons/i);
  });

  it("renders navigation bar", () => {
    const { getByRole } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
      { container }
    );

    const nav = getByRole("navigation");

    expect(nav).toBeDefined();
  });

  it("renders home and shop links", () => {
    const { getAllByRole } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
      { container }
    );

    const links = getAllByRole("link");

    expect(links.some((l) => l.textContent.match(/home/i))).toBe(true);
    expect(links.some((l) => l.textContent.match(/shop/i))).toBe(true);
  });

  it("renders homepage by default", () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
      { container }
    );

    const main = screen.getByRole("main");

    expect(main.id).toMatch("homepage");
  });

  it("renders shop page when shop link is clicked", () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
      { container }
    );

    const shopPageLink = screen.getByRole("link", { name: /shop/i });

    userEvent.click(shopPageLink);

    const main = screen.getByRole("main");

    expect(main.id).toMatch("shoppage");
  });
});
