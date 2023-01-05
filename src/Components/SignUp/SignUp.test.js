import { fireEvent, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { BrowserRouter as Router} from "react-router-dom"
import { customRender } from "../../App.test"
import { localStorageMock } from "../../setupTests"


import SignUp from "./SignUp"

describe("signup tests",() => {
    beforeAll(()=>{
        Object.defineProperty(window, "localStorage", { value: localStorageMock });
    })
    beforeEach(()=>{
        Object.defineProperty(window, "location", { value: {pathname: "/signUp"}});
    })
    
    test("display sign up form",() => {
        customRender(<Router><SignUp/></Router>,{currentUser:null, userDetails:[]})
    
        expect(screen.getByPlaceholderText("First Name")).toBeTruthy();
        expect(screen.getByPlaceholderText("Last Name")).toBeTruthy();
        expect(screen.getByPlaceholderText("Email")).toBeTruthy();
        expect(screen.getByPlaceholderText("Password")).toBeTruthy();
        expect(screen.getByPlaceholderText("Confirm Password")).toBeTruthy();
        expect(screen.getByRole("button")).toHaveTextContent("Sign Up");
        expect(screen.getByRole("link")).toHaveTextContent("Sign In");
        expect(screen.getByText("Already have an account?")).toBeTruthy();
    })
    
    test("update form input fields when changed",() => {
       
        customRender(<Router><SignUp/></Router>,{currentUser:null, userDetails:[]})
    
        let firstNameEl = screen.getByPlaceholderText("First Name")
        let lastNameEl= screen.getByPlaceholderText("Last Name")
        let emailEl = screen.getByPlaceholderText("Email")
        let paswordEl = screen.getByPlaceholderText("Password")
        let confirmPasswordEl = screen.getByPlaceholderText("Confirm Password")
        
        userEvent.type(firstNameEl,"New")
        expect(firstNameEl).toHaveValue("New")
    
        userEvent.type(lastNameEl,"User")
        expect(lastNameEl).toHaveValue("User")
    
        userEvent.type(emailEl,"testuser@test2")
        expect(emailEl).toHaveValue("testuser@test2")
    
        userEvent.type(paswordEl,"test")
        expect(paswordEl).toHaveValue("test")
    
        userEvent.type(confirmPasswordEl,"test")
        expect(confirmPasswordEl).toHaveValue("test")  
    })
    
    // test("signup when details are correct",() => {
    //     customRender(<Router><SignUp/></Router>,{currentUser:null, userDetails:[]})
    
    //     let firstNameEl = screen.getByPlaceholderText("First Name")
    //     let lastNameEl= screen.getByPlaceholderText("Last Name")
    //     let emailEl = screen.getByPlaceholderText("Email")
    //     let paswordEl = screen.getByPlaceholderText("Password")
    //     let confirmPasswordEl = screen.getByPlaceholderText("Confirm Password")
    //     let signUpButton = screen.getByRole("button");
        
    //     userEvent.type(firstNameEl,"New")
    //     userEvent.type(lastNameEl,"User")
    //     userEvent.type(emailEl,"testuser@test3")
    //     userEvent.type(paswordEl,"test")
    //     userEvent.type(confirmPasswordEl,"test")
    
    //     fireEvent.click(signUpButton) 
    
    //     expect(window.location.pathname).toBe("/signIn")    
    // })
    
    test("show account already exists error when existing user signs up",() => {
        customRender(<Router><SignUp/></Router>,{currentUser:null, userDetails:[]})
    
        let firstNameEl = screen.getByPlaceholderText("First Name")
        let lastNameEl= screen.getByPlaceholderText("Last Name")
        let emailEl = screen.getByPlaceholderText("Email")
        let paswordEl = screen.getByPlaceholderText("Password")
        let confirmPasswordEl = screen.getByPlaceholderText("Confirm Password")
        let signUpButton = screen.getByRole("button");
        
        userEvent.type(firstNameEl,"New")
        userEvent.type(lastNameEl,"User")
        userEvent.type(emailEl,"testuser@test")
        userEvent.type(paswordEl,"test")
        userEvent.type(confirmPasswordEl,"test")
    
        // fireEvent.click(signUpButton) 
        
        expect(window.location.pathname).toBe("/signUp")
    })
    
})

