import { BrowserRouter as Router} from "react-router-dom"
import Favorites from "./Favorites"
import { customRender } from "../../setupTests"
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
    const mockFetch = () => {
        global.fetch = ()=>Promise.resolve(
            {
                json:()=>{
                     return Promise.resolve({
                        
                           "page": 1,
                            "results": [
                            {
                            "adult": false,
                            "backdrop_path": "/s16H6tpK2utvwDtzZ8Qy4qm5Emw.jpg",
                            "genre_ids": [
                            878,
                            12,
                            28
                            ],
                            "id": 1007,
                            "original_language": "en",
                            "original_title": "James Bond",
                            "overview": "Bond is great",
                            "popularity": 5359.253,
                            "poster_path": "/t6HIqrRAclMCA60NsSmeqe9RmNV.jpg",
                            "release_date": "2022-07-07",
                            "title": "James Bond",
                            "video": false,
                            "vote_average": 7.5,
                            "vote_count": 9999
                            }]
                    })
                },
            }
        )
    }
    
    test("display favorite movies header",()=>{
        mockFetch()
        customRender(<Router><Favorites/></Router>, {userContext:{currentUser: {name: "test", email:"test@header"}}})
        
        expect(screen.getByText("test's favorites")).toBeTruthy()
    })
    
    test("display favorite movies", async ()=>{
        mockFetch()
        customRender(<Router><Favorites/></Router>, {userContext:{currentUser: {name: "test", email:"test@header"}}, favMovies:[1007]})
        await waitFor(()=>{
            expect(screen.getByText("James Bond")).toBeTruthy()
        })
    
    })
    
})