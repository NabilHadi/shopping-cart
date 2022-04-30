import { unmountComponentAtNode } from "react-dom";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Homepage from "../components/Homepage";
import { MemoryRouter, Router } from "react-router-dom";
import { createMemoryHistory } from "history";

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
    const { getByRole } = render(<Homepage />, {
      container,
      wrapper: MemoryRouter,
    });

    const header = getByRole("heading");

    expect(header).toBeDefined();
  });

  it("renders image", () => {
    const { getByRole } = render(<Homepage />, {
      container,
      wrapper: MemoryRouter,
    });

    const image = getByRole("img");

    expect(image).toBeDefined();
  });

  it("clicking on image renders shop page", () => {
    const history = createMemoryHistory();
    const { getByRole } = render(
      <Router location={history.location} navigator={history}>
        <Homepage />
      </Router>,
      {
        container,
      }
    );

    const image = getByRole("img", { name: /icons/i });

    userEvent.click(image);

    expect(history.location.pathname).toMatch("/shop");
  });
});
