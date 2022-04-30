import { unmountComponentAtNode } from "react-dom";
import { render, screen } from "@testing-library/react";
import App from "../App";
import userEvent from "@testing-library/user-event";
import Homepage from "../components/Homepage";
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

describe("Homepage", () => {
  it("renders heading", () => {
    const { getByRole } = render(
      <MemoryRouter>
        <Homepage />
      </MemoryRouter>,
      { container }
    );

    const header = getByRole("heading");

    expect(header).toBeDefined();
  });

  it("renders image", () => {
    const { getByRole } = render(
      <MemoryRouter>
        <Homepage />
      </MemoryRouter>,
      { container }
    );

    const image = getByRole("img");

    expect(image).toBeDefined();
  });
});
