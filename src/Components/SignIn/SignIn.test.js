import { fireEvent, screen } from "@testing-library/react"
import { BrowserRouter as Router} from "react-router-dom";
import SignIn from "./SignIn";
import { customRender } from "../../setupTests"
import userEvent from "@testing-library/user-event";
import { localStorageMock } from "../../setupTests";


const signInUser = jest.fn()

  

test("display required input fields",()=>{
    customRender(<Router><SignIn signInUser={signInUser}></SignIn></Router>,{currentUser:null})
    
    expect(screen.getByPlaceholderText("Email")).toBeTruthy();
    expect(screen.getByPlaceholderText("Password")).toBeTruthy();
    expect(screen.getByRole("button")).toHaveTextContent("Sign In");
    expect(screen.getByRole("link")).toHaveTextContent("Sign Up");
    expect(screen.getByText("Don't have an account?")).toBeTruthy();
})

test("sign in when the button is clicked",()=>{
    Object.defineProperty(window, "localStorage", { value: localStorageMock});
    customRender(<Router><SignIn signInUser={signInUser}></SignIn></Router>,{currentUser:null})
    let emailInput = screen.getByPlaceholderText("Email")
    let passwordInput = screen.getByPlaceholderText("Password")
    let sigInButton = screen.getByRole("button");
    
    userEvent.type(emailInput,"testuser@test")
    userEvent.type(passwordInput,"test")

    expect(emailInput).toHaveValue("testuser@test")
    expect(passwordInput).toHaveValue("test")

    fireEvent.click(sigInButton)
    
    expect(signInUser).toBeCalled()
})

test("show password incorrect message for wrong password",()=>{
  Object.defineProperty(window, "localStorage", { value: localStorageMock });
  customRender(<Router><SignIn signInUser={signInUser}></SignIn></Router>,{currentUser:null})
  let emailInput = screen.getByPlaceholderText("Email")
  let passwordInput = screen.getByPlaceholderText("Password")
  let sigInButton = screen.getByRole("button");
  
  userEvent.type(emailInput,"testuser@test")
  userEvent.type(passwordInput,"test1")

  expect(emailInput).toHaveValue("testuser@test")
  expect(passwordInput).toHaveValue("test1")

  fireEvent.click(sigInButton)
  
  expect(signInUser).not.toBeCalled()
  expect(screen.getByTestId("invalid-message")).toHaveTextContent("Password incorrect")
})

test("show account not found message when user doesn't exist",()=>{
  Object.defineProperty(window, "localStorage", { value: localStorageMock });
  customRender(<Router><SignIn signInUser={signInUser}></SignIn></Router>,{currentUser:null})
  let emailInput = screen.getByPlaceholderText("Email")
  let passwordInput = screen.getByPlaceholderText("Password")
  let sigInButton = screen.getByRole("button");
  
  userEvent.type(emailInput,"testuser@test1")
  userEvent.type(passwordInput,"test1")

  fireEvent.click(sigInButton)
  
  expect(signInUser).not.toBeCalled()
  expect(screen.getByTestId("invalid-message")).toHaveTextContent("Account not found")
})

test("redirect user to sign up when sign up link is clicked",()=>{
  customRender(<Router><SignIn signInUser={signInUser}></SignIn></Router>,{currentUser:null})
  let signUpLink = screen.getByRole("link")

  fireEvent.click(signUpLink)
  
  expect(window.location.pathname).toBe("/signUp")
})



