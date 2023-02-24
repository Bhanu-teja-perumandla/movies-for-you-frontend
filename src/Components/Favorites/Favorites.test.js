import { BrowserRouter as Router } from "react-router-dom";
import Favorites from "./Favorites";
import { customRender, JamesBondMovie, mockFetch } from "../../setupTests";
import { screen, waitFor } from "@testing-library/react";

describe("favorites test", () => {
//   test("display favorite movies header", async () => {
//     customRender(
//       <Router>
//         <Favorites />
//       </Router>,
//       { userContext: { currentUser: { name: "test", email: "test@header" } } }
//     );

//     expect(screen.getByText("test's favorites")).toBeTruthy();
//   });

  test("display favorite movies and header", async () => {
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
    customRender(
      <Router>
        <Favorites />
      </Router>,
      {
        userContext: { currentUser: { name: "test", email: "test@header" } },
        favMovies: [1007],
      }
    );
    expect(screen.getByText("test's favorites")).toBeTruthy();
    await waitFor(() => {
      expect(screen.getByText("James Bond")).toBeTruthy();
    });
  });
});
