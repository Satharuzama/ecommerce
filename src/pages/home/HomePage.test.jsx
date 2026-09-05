import { render, screen, within } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { MemoryRouter } from "react-router";
import { HomePage } from "./HomePage";
import userEvent from "@testing-library/user-event";

describe("Homepage component", () => {
  let loadCart;
  let user;

  beforeEach(() => {
    loadCart = vi.fn();

    user = userEvent.setup();
  });
  it("display the products correct", async () => {
    render(
      <MemoryRouter>
        <HomePage cart={[]} loadCart={loadCart} />
      </MemoryRouter>,
    );
    const productContainer = await screen.findAllByTestId("product-container");
    expect(productContainer.length).toBe(6);

    expect(
      within(productContainer[0]).getByText(
        "Black and Gray Athletic Cotton Socks - 6 Pairs",
      ),
    ).toBeInTheDocument();

    expect(
      within(productContainer[1]).getByText("Intermediate Size Basketball"),
    ).toBeInTheDocument();
  });
  it("adds a product to the cart", async () => {
    render(
      <MemoryRouter>
        <HomePage cart={[]} loadCart={loadCart} />
      </MemoryRouter>,
    );
    const productContainers = await screen.findAllByTestId("product-container");

    const quantitySelector1 = within(productContainers[0])
      .getByTestId('product-quantity-container');
    await user.selectOptions(quantitySelector1, '2');

    const addToCartButton1 = within(productContainers[0]).getByTestId(
      "add-to-cart-button",
    );
    await user.click(addToCartButton1);

        const quantitySelector2 = within(productContainers[1])
      .getByTestId('product-quantity-container');
    await user.selectOptions(quantitySelector2, '3');

    const addToCartButton2 = within(productContainers[1]).getByTestId(
      "add-to-cart-button",
    );
    await user.click(addToCartButton2);

    expect(loadCart).toHaveBeenCalledTimes(2);
  });
});
