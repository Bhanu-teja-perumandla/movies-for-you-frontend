import { useEffect, useState } from "react";

export const makeApiCall = async (url)=>{
    let data = []
    try{
        let raw_response = await fetch(url);
        let response = await raw_response.json();
        data = response.results;      
    }
   catch(e){
      console.log("error"+e)
    }
   return data
}

export function useAPI(url) {
    const [data, setData] = useState([])

     useEffect(()=>{
        let getData = async ()=> {
            let data =  await makeApiCall(url)
            console.log("api called")
            setData(data)
         }
        getData()
    },[url]);
    
    return [data]
}

export function getMoviesFrom(data) {
    return data.map((movie)=>{
        return {
            id:movie.id,
            movieName:movie.original_title,
            rating:movie.vote_average,
            poster:"http://image.tmdb.org/t/p/w500/"+movie.poster_path,
            description:movie.overview,
        }
    })
}