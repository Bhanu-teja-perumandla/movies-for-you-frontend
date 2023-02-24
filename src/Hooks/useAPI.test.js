import { renderHook, waitFor } from "@testing-library/react"
import { makeApiCall, useAPI } from "./useAPI"
import { urls } from "../urls"
import { JamesBondMovie, mockFetch } from "../setupTests"

test("useAPI state change",async ()=>{
    fetch.mockImplementationOnce(() =>
    Promise.resolve({
      json: () => {
        return Promise.resolve({
          page: 1,
          results: [JamesBondMovie],
        });
      },
    })
  );
    const {result} = renderHook(()=>useAPI(urls.popularMovies))
    
    expect(result.current.data).toStrictEqual([])
    
    await waitFor(()=>{
        expect(result.current.data).toStrictEqual([JamesBondMovie])
    })
})

// test("check if makeAPICall function is called",async ()=>{
//     jest.mock("./useAPI")
//     // makeApiCall.mockImplementation = jest.fn()
//     const {result} = renderHook(()=>useAPI(urls.popularMovies))
    
//     await waitFor(()=>expect(makeApiCall).toHaveBeenCalledTimes(1))
    
// })