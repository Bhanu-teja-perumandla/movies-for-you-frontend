import { screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import Header from "./Header"
import { customRender } from "../../App.test"
import { BrowserRouter as Router } from 'react-router-dom';

test("loads options on hover",async  ()=> {
    customRender(<Router><Header signOutUser={()=>{}}/></Router>, {currentUser: {name: "test", email:"test@header"}, userDetails:[]})

    try{await userEvent.hover(screen.getByText("Options"))}
    catch(e){
        console.log(e)
    }
    
    expect(screen.getByText("My Profile")).toBeTruthy()
})

test("does not display options without hover",async  ()=> {
    customRender(<Router><Header signOutUser={()=>{}}/></Router>, {currentUser: {name: "test", email:"test@header"}, userDetails:[]})

    expect(screen.queryByText("My Profile")).toBeFalsy()
})