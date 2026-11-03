import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { Product } from "./Product";

describe("Product component", () => {
  let product;
  let loadCart;
  let user;

  beforeEach(() => {
    product = {
      id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
      image: "images/products/athletic-cotton-socks-6-pairs.jpg",
      name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
      rating: {
        stars: 4.5,
        count: 87,
      },
      priceCents: 1090,
      keywords: ["socks", "sports", "apparel"],
    };
    loadCart = vi.fn();
    user = userEvent.setup();
  });
  it("display the product details correctly", () => {
    render(<Product product={product} loadCart={loadCart} />);

    expect(
      screen.getByText("Black and Gray Athletic Cotton Socks - 6 Pairs"),
    ).toBeInTheDocument();

    expect(screen.getByText("₹11")).toBeInTheDocument();

    expect(screen.getByTestId("product-image")).toHaveAttribute(
      "src",
      "/images/products/athletic-cotton-socks-6-pairs.jpg",
    );

    expect(screen.getByTestId("product-rating-stars")).toHaveAttribute(
      "src",
      "/images/ratings/rating-45.png",
    );
    expect(screen.getByText("87")).toBeInTheDocument();
  });
  it("draws stars for ratings without a matching image", () => {
    product.rating.stars = 4.3;
    render(<Product product={product} loadCart={loadCart} />);

    const stars = screen.getByTestId("product-rating-stars");
    expect(stars.tagName.toLowerCase()).toBe("svg");
    expect(stars).toHaveAttribute("aria-label", "4.3 out of 5 stars");
    expect(stars.querySelectorAll("polygon")).toHaveLength(5);
    expect(screen.getByText("87")).toBeInTheDocument();
  });
  it("adds product to the cart", async () => {
    const loadCart = vi.fn();

    render(<Product product={product} loadCart={loadCart} />);
    const addToCartButton = screen.getByTestId("add-to-cart-button");
    await user.click(addToCartButton);

    expect(loadCart).toHaveBeenCalled();
  });
  it("selects a quantity", async () => {
    render(<Product product={product} loadCart={loadCart} />);

    const quantitySelector = screen.getByTestId("product-quantity-container");
    expect(quantitySelector).toHaveValue("1");

    await user.selectOptions(quantitySelector, "3");
    expect(quantitySelector).toHaveValue("3");
    const addToCartButton = screen.getByTestId("add-to-cart-button");
    await user.click(addToCartButton);

    expect(loadCart).toHaveBeenCalled();
  });
});
