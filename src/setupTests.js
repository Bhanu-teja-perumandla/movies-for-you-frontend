// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

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
