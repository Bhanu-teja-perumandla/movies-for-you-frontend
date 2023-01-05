import { fireEvent, screen } from "@testing-library/react"
import { customRender } from "../../App.test"
import MovieCard from "./MovieCard"

const testMovie = {id:"123",
    poster:"../../images/MoviesForYou.png",
    movieName:"TestMovie",
    rating:7.5,
    description:"Description of the test movie"}

const updateFavorites = jest.fn()

const updateRatings = jest.fn()

test("show option for user rating only when signed in",()=>{
  customRender(<MovieCard movie={testMovie} isFavorite={true} yourRating={0} updateYourRating={()=>{}} updateIsFavorite={()=>{}}/>,{currentUser: {name: "test", email:"test@header"}, userDetails:[]})
  expect(screen.getByTestId("your-rating")).toBeTruthy()
})

test("hide option for user rating when not signed in",()=>{
    customRender(<MovieCard movie={testMovie} isFavorite={true} yourRating={0} updateYourRating={()=>{}} updateIsFavorite={()=>{}}/>,{currentUser: null, userDetails:[]})
    expect(screen.queryByTestId("your-rating")).toBeNull()
  })

test("show option for favorite only when signed in",()=>{
  customRender(<MovieCard movie={testMovie} isFavorite={true} yourRating={0} updateYourRating={()=>{}} updateIsFavorite={()=>{}}/>,{currentUser: {name: "test", email:"test@header"}, userDetails:[]})
  expect(screen.getByTestId("favorite")).toBeTruthy()
})

test("hide option for favorite when not signed in",()=>{
    customRender(<MovieCard movie={testMovie} isFavorite={true} yourRating={0} updateYourRating={()=>{}} updateIsFavorite={()=>{}}/>,{currentUser: null, userDetails:[]})
    expect(screen.queryByTestId("favorite")).toBeNull()
  })

test("display movie details",()=>{
  customRender(<MovieCard movie={testMovie} isFavorite={true} yourRating={0} updateYourRating={()=>{}} updateIsFavorite={()=>{}}/>,{currentUser: null, userDetails:[]})
  
  expect(screen.getAllByAltText("movie poster goes here")).toBeTruthy()
  expect(screen.getByText("TestMovie")).toBeTruthy()
  expect(screen.getByText("7.5/10")).toBeTruthy()
  expect(screen.getByText("Description of the test movie")).toBeTruthy()
})

test("toggle isFavorite checkbox when clicked",()=>{
  customRender(<MovieCard movie={testMovie} isFavorite={true} yourRating={0} updateYourRating={()=>{}} updateIsFavorite={updateFavorites}/>,{currentUser: {name: "test", email:"test@header"}, userDetails:[]})
  let checkbox = screen.getByRole("checkbox")
  expect(checkbox).toBeChecked()

  fireEvent.click(checkbox)

  expect(updateFavorites).toBeCalled()

})

test("change your-rating when clicked",()=>{
  customRender(<MovieCard movie={testMovie} isFavorite={true} yourRating={1} updateYourRating={updateRatings} updateIsFavorite={updateFavorites}/>,{currentUser: {name: "test", email:"test@header"}, userDetails:[]})
  let ratings = screen.getAllByRole("radio")

  expect(ratings[1]).toBeChecked()

  fireEvent.click(ratings[2])

  expect(updateRatings).toBeCalled()
})