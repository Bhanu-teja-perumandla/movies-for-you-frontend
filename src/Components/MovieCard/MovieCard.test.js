import { fireEvent, screen } from "@testing-library/react"
import { customRender, updateFavMovies, updateYourRatings } from "../../setupTests"
import MovieCard from "./MovieCard"

const testMovie = {id:"123",
    poster:"../../images/MoviesForYou.png",
    movieName:"TestMovie",
    rating:7.5,
    description:"Description of the test movie"}

test("show option for user rating only when signed in",()=>{
  customRender(<MovieCard movie={testMovie}/>,{userContext:{currentUser: {name: "test", email:"test@header"}}})
  expect(screen.getByTestId("your-rating")).toBeTruthy()
})

test("hide option for user rating when not signed in",()=>{
    customRender(<MovieCard movie={testMovie}/>,{userContext:{currentUser:null}})
    expect(screen.queryByTestId("your-rating")).toBeNull()
  })

test("show option for favorite only when signed in",()=>{
  customRender(<MovieCard movie={testMovie}/>,{userContext:{currentUser: {name: "test", email:"test@header"}}})
  expect(screen.getByTestId("favorite")).toBeTruthy()
})

test("hide option for favorite when not signed in",()=>{
    customRender(<MovieCard movie={testMovie}/>,{userContext:{currentUser:null}})
    expect(screen.queryByTestId("favorite")).toBeNull()
  })

test("display movie details",()=>{
  customRender(<MovieCard movie={testMovie}/>,{userContext:{currentUser:null}})
  
  expect(screen.getAllByAltText("movie poster goes here")).toBeTruthy()
  expect(screen.getByText("TestMovie")).toBeTruthy()
  expect(screen.getByText("7.5/10")).toBeTruthy()
  expect(screen.getByText("Description of the test movie")).toBeTruthy()
})

test("toggle isFavorite checkbox when clicked",()=>{
  customRender(<MovieCard movie={testMovie} />,{userContext:{currentUser: {name: "test", email:"test@header"}}})
  let checkbox = screen.getByRole("checkbox")
  
  expect(checkbox).not.toBeChecked()

  fireEvent.click(checkbox)

  expect(updateFavMovies).toBeCalled()

})

test("change your-rating when clicked",()=>{
  customRender(<MovieCard movie={testMovie}/>,{userContext:{currentUser: {name: "test", email:"test@header"}}})
  let ratings = screen.getAllByRole("radio")

  expect(ratings[1]).not.toBeChecked()

  fireEvent.click(ratings[2])

  expect(updateYourRatings).toBeCalled()
})