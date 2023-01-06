import { screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import Header from "./Header"
import { BrowserRouter as Router } from 'react-router-dom';
import { customRender } from "../../setupTests";

test("loads options on hover",()=> {
    customRender(<Router><Header signOutUser={()=>{}}/></Router>, {userContext:{currentUser: {name: "test", email:"test@header"}}})

    userEvent.hover(screen.getByText("Options"))
    
    expect(screen.getByText("My Profile")).toBeTruthy()
})

test("does not display options without hover",async  ()=> {
    customRender(<Router><Header signOutUser={()=>{}}/></Router>, {userContext:{currentUser: {name: "test", email:"test@header"}}})

    expect(screen.queryByText("My Profile")).toBeFalsy()
})