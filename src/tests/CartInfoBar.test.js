import { unmountComponentAtNode } from "react-dom";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CartInforBar from "../components/CartInfoBar";

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

describe("CartInfoBar", () => {
  it("renders element with cart info bar label", () => {
    const { getByLabelText } = render(<CartInforBar itemsCount={4} />, {
      container,
    });

    getByLabelText(/cart info bar/i);
  });

  it("renders correct items count", () => {
    const { getByLabelText } = render(<CartInforBar itemsCount={4} />, {
      container,
    });

    expect(getByLabelText(/items in cart count/i).textContent).toMatch(/4/);
  });

  it("renders checkout button", () => {
    const { getByRole } = render(<CartInforBar />, { container });

    getByRole("button", { name: /checkout/i });
  });

  it("clicking checkout button calls checkout function", () => {
    const checkoutMock = jest.fn();
    const { getByRole } = render(<CartInforBar onCheckout={checkoutMock} />, {
      container,
    });

    const checkoutBtn = getByRole("button", { name: /checkout/i });
    userEvent.click(checkoutBtn);
    expect(checkoutMock).toHaveBeenCalledTimes(1);
  });
});
