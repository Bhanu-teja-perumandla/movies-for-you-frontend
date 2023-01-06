// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { FavMoviesContext, UserContext, YourRatingsContext } from './App';

export const updateFavMovies = jest.fn();
export const updateYourRatings = jest.fn();

export function customRender(ui, userContext){
  return render(
    <UserContext.Provider value={userContext}>
      <FavMoviesContext.Provider value={{favMovies:[],updateFavMovies}}>
        <YourRatingsContext.Provider value={{yourRatings:[],updateYourRatings}}>
          {ui}
        </YourRatingsContext.Provider>
      </FavMoviesContext.Provider>
    </UserContext.Provider>
  )
}

export const localStorageMock = (function () {
    let store = {
        users:JSON.stringify([{
            confirmPassword: "test",
            email : "testuser@test",
            favMovies : [661374, 76600, 736526, 315162],
            firstName : "Test",
            lastName : "User",
            password : "test",
            ratings : [{movieId: 411}],
        }])
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
