import { fireEvent, render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { BrowserRouter as Router } from "react-router-dom"
import { UserContext } from "../../App"
import Header from "./Header"


const customRender = (ui, userContext) => {
    return render(<UserContext.Provider value={userContext}><Router>{ui}</Router></UserContext.Provider>)
}

test("loads options on hover",async  ()=> {
    customRender(<Header signOutUser={()=>{}}/>, {currentUser: {name: "test", email:"test@header"}, userDetails:[]})

    try{await userEvent.hover(screen.getByText("Options"))}
    catch(e){
        console.log(e)
    }
    
    expect(screen.getByText("My Profile")).toBeTruthy()
})

test("does not display options without hover",async  ()=> {
    customRender(<Header signOutUser={()=>{}}/>, {currentUser: {name: "test", email:"test@header"}, userDetails:[]})

    expect(screen.queryByText("My Profile")).toBeFalsy()
})