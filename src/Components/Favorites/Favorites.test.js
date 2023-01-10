import { BrowserRouter as Router} from "react-router-dom"
import Favorites from "./Favorites"
import { customRender, mockFetch } from "../../setupTests"
import { screen, waitFor } from "@testing-library/react"



// const useAPIHooks =  require("./src/Hooks/useAPI.js")

// jest.mock("useAPIHooks",()=> ({
//     useAPI: () => [
//         {
//             id:1007,
//             movieName:"James Bond",
//             rating:7.5,
//             poster:"../../images/MoviesForYou.png",
//             description:"Bond is great",
//         }
//     ]
// }));
// console.log("curr dir ", __dirname)
// jest.mock('make_api_call')


// make_api_call = jest.fn(()=>([
//         {
//             id:1007,
//             movieName:"James Bond",
//             rating:7.5,
//             poster:"../../images/MoviesForYou.png",
//             description:"Bond is great",
//         }
//     ]))

// make_api_call.mockResolvedValue([
//     {
//         id:1007,
//         movieName:"James Bond",
//         rating:7.5,
//         poster:"../../images/MoviesForYou.png",
//         description:"Bond is great",
//     }
// ])

describe("favorites test",()=> {
 
    
    test("display favorite movies header",async()=>{
        // mockFetch()
        customRender(<Router><Favorites/></Router>, {userContext:{currentUser: {name: "test", email:"test@header"}}})
        
        await waitFor(()=>expect(screen.getByText("test's favorites")).toBeTruthy())
    })
    
    test("display favorite movies", async ()=>{
        mockFetch()
        customRender(<Router><Favorites/></Router>, {userContext:{currentUser: {name: "test", email:"test@header"}}, favMovies:[1007]})
        await waitFor(()=>{
            expect(screen.getByText("James Bond")).toBeTruthy()
        })
    
    })
    
})