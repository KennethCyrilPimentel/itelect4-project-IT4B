import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import ShootCard from "./ShootCard";
import type { ApiShoot } from "../../types/index";
import { ShootStatus } from "../../types/index";

// One shoot shaped like a row from GET /api/shoots. Typed, so a wrong
// field name is a compile error here too.
const confirmed: ApiShoot = {
  id: "665f1c2ab4e8d3a1f0c9e101",
  clientId: "665f1c2ab4e8d3a1f0c9e001",
  type: "Engagement",
  status: ShootStatus.Confirmed,
  scheduledDate: "2026-08-15T00:00:00.000Z",
  location: "Lipa City",
};

describe("ShootCard", () => {
  it("shows the type, the location and a readable status", () => {
    render(<ShootCard shoot={confirmed} />);

    expect(screen.getByText("Engagement")).toBeInTheDocument();
    expect(screen.getByText("Lipa City")).toBeInTheDocument();
    expect(screen.getByText("Status: Confirmed")).toBeInTheDocument();
  });

  it("hides the location in the compact variant", () => {
    render(<ShootCard shoot={confirmed} variant="compact" />);

    expect(screen.getByText("Engagement")).toBeInTheDocument();
    // queryBy returns null instead of throwing, so we can check "not there"
    expect(screen.queryByText("Lipa City")).not.toBeInTheDocument();
  });

  it("shows Completed when the status is Completed", () => {
    const completed: ApiShoot = { ...confirmed, status: ShootStatus.Completed };

    render(<ShootCard shoot={completed} />);

    expect(screen.getByText("Status: Completed")).toBeInTheDocument();
  });
});