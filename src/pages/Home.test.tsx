import { render, screen } from "@testing-library/react";
import Home from "./Home";
import { describe, it, expect } from "vitest";
import { MemoryRouter } from "react-router-dom";

describe("Home", () => {
  it("renders home page correctly", () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );
    // Hero Image
    const heroImage = screen.getByRole("img", {
      name: /cello\-lesson/i,
    });
    expect(heroImage).toBeInTheDocument();

    // Heading Text
    const heading = screen.getByRole("heading", {
      name: /connecting teachers and students one lesson at a time/i,
    });
    expect(heading).toBeInTheDocument();

    // Sub Heading Text
    const subheading = screen.getByText(
      /ensuring the success of students and teachers alike!/i
    );
    expect(subheading).toBeInTheDocument();
  });
});
