import { render, screen } from "@testing-library/react";
import Home from "./Home";
import { describe, it, expect } from "vitest";
import { MemoryRouter } from "react-router-dom";

describe("Home", () => {
  it("render hero image", () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );
    const hero = screen.getByAltText("cello-lesson");
    expect(hero).toBeInTheDocument();
  });

  it("renders headline text", () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );
    const headline = screen.getByText(
      "Connecting Teachers and Students One Lesson at a Time"
    );
    expect(headline).toBeInTheDocument();
  });
});
