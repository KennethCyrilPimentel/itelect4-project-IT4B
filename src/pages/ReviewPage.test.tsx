import { describe, it, expect, vi, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ReviewPage from "./ReviewPage";

// ReviewPage uses useMutation, which throws unless the page sits inside
// the same QueryClientProvider that main.tsx gives the real app.
function renderReviewPage() {
  const queryClient = new QueryClient();
  render(
    <QueryClientProvider client={queryClient}>
      <ReviewPage />
    </QueryClientProvider>,
  );
}

// Put fetch back after every test, so a spy can't leak into the next one.
afterEach(() => {
  vi.restoreAllMocks();
});

describe("ReviewPage", () => {
  it("shows the schema message when the form is sent empty", async () => {
    const user = userEvent.setup();
    renderReviewPage();

    await user.click(screen.getByRole("button", { name: "Review my shoot" }));

    // The exact sentence from src/schemas/reviewSchema.ts.
    expect(
      await screen.findByText("Describe your shoot in at least 20 characters."),
    ).toBeInTheDocument();
  });

  it("sends nothing to the API while the description is too short", async () => {
    // Watch fetch without stopping it. If the form ever got past the
    // schema, request() in client.ts would call fetch and this spy
    // would count it.
    const fetchSpy = vi.spyOn(globalThis, "fetch");
    const user = userEvent.setup();
    renderReviewPage();

    await user.type(screen.getByLabelText("Shoot description"), "Too short");
    await user.click(screen.getByRole("button", { name: "Review my shoot" }));

    expect(
      await screen.findByText("Describe your shoot in at least 20 characters."),
    ).toBeInTheDocument();
    expect(fetchSpy).not.toHaveBeenCalled();
  });
});