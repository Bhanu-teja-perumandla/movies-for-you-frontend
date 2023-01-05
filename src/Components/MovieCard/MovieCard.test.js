import { screen } from "@testing-library/react"
import { customRender } from "../../App.test"
import MovieCard from "./MovieCard"

const testMovie = {id:"123",
    poster:"../../images/MoviesForYou.png",
    movieName:"TestMovie",
    rating:7.5,
    description:"Description of the test movie"}
test("show option for user rating only when signed in",()=>{
  customRender(<MovieCard movie={testMovie} isFavorite={true} yourRating={0} updateYourRating={()=>{}} updateIsFavorite={()=>{}}/>,{currentUser: {name: "test", email:"test@header"}, userDetails:[]})
  expect(screen.getByTestId("your-rating")).toBeTruthy()
})

test("hide option for user rating when not signed in",()=>{
    customRender(<MovieCard movie={testMovie} isFavorite={true} yourRating={0} updateYourRating={()=>{}} updateIsFavorite={()=>{}}/>,{currentUser: null, userDetails:[]})
    expect(screen.queryByTestId("your-rating")).toBeNull()
  })
