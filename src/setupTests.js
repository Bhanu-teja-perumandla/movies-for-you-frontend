// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import { FavMoviesContext, UserContext, YourRatingsContext } from "./App";

export const updateFavMovies = jest.fn();
export const updateYourRatings = jest.fn();

export function customRender(ui, { userContext, favMovies, yourRatings }) {
  return render(
    <UserContext.Provider value={userContext}>
      <FavMoviesContext.Provider
        value={{ favMovies: favMovies ?? [], updateFavMovies }}
      >
        <YourRatingsContext.Provider
          value={{ yourRatings: yourRatings || [], updateYourRatings }}
        >
          {ui}
        </YourRatingsContext.Provider>
      </FavMoviesContext.Provider>
    </UserContext.Provider>
  );
}

export const localStorageMock = (function () {
  let store = {
    users: JSON.stringify([
      {
        confirmPassword: "test",
        email: "testuser@test",
        favMovies: [661374, 76600, 736526, 315162],
        firstName: "Test",
        lastName: "User",
        password: "test",
        ratings: [{ movieId: 411 }],
      },
    ]),
  };

  return {
    getItem(key) {
      return store[key] || null;
    },

    setItem(key, value) {
      store[key] = value;
    },

    clear() {
      store = {};
    },

    removeItem(key) {
      delete store[key];
    },

    getAll() {
      return store;
    },
  };
})();

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => {
      return Promise.resolve({
        page: 1,
        results: [JamesBondMovie],
      });
    },
  })
);

export const JamesBondMovie = {
  adult: false,
  backdrop_path: "/s16H6tpK2utvwDtzZ8Qy4qm5Emw.jpg",
  genre_ids: [878, 12, 28],
  id: 1007,
  original_language: "en",
  original_title: "James Bond",
  overview: "Bond is great",
  popularity: 5359.253,
  poster_path: "/t6HIqrRAclMCA60NsSmeqe9RmNV.jpg",
  release_date: "2022-07-07",
  title: "James Bond",
  video: false,
  vote_average: 7.5,
  vote_count: 9999,
};
