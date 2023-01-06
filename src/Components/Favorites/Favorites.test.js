import { BrowserRouter as Router} from "react-router-dom"
import Favorites from "./Favorites"
import { customRender } from "../../setupTests"
import { screen } from "@testing-library/react"


test("display favorite movies header",()=>{
    customRender(<Router><Favorites/></Router>, {userContext:{currentUser: {name: "test", email:"test@header"}}})
    
    expect(screen.getByText("test's favorites")).toBeTruthy()
})

// test("display favorite movies",()=>{
//     customRender(<Router><Favorites/></Router>, {userContext:{currentUser: {name: "test", email:"test@header"}}, favMovies:[76600]})
    
//     screen.debug()
//     expect(screen.getByText("76600")).toBeTruthy()
// })