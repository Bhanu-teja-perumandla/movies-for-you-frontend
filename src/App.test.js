import { render, screen, waitFor } from "@testing-library/react";
import App, { FavMoviesContext, UserContext, YourRatingsContext } from "./App";
import { JamesBondMovie } from "./setupTests";

test("renders hello world", async () => {
  fetch.mockImplementationOnce(() =>
    Promise.resolve({
      json: () => {
        return Promise.resolve({
          page: 1,
          results: [JamesBondMovie],
        });
      },
    })
  );
  render(<App />);
  const linkElement = screen.getByText("MoviesForYou");
  expect(linkElement).toBeInTheDocument();
  await waitFor(() => {
    expect(screen.getByText("James Bond")).toBeTruthy();
  });
});
