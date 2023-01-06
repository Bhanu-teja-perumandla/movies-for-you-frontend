import { useEffect, useState } from "react";
import keys from "../access-info";

export const make_api_call = async ()=>{
    let popularMovies = []
 try{
    let raw_response = await fetch("https://api.themoviedb.org/3/movie/popular?api_key="+keys.tmdbApiKey);
    let response = await raw_response.json();
    let results = response.results;
        popularMovies = results.map((movie)=>{
        return {
            id:movie.id,
            movieName:movie.original_title,
            rating:movie.vote_average,
            poster:"http://image.tmdb.org/t/p/w500/"+movie.poster_path,
            description:movie.overview,
        }
        })
   }
   catch(e){
      console.log("error"+e)
    }
    return popularMovies
}

export function useAPI() {
    const [popularMovies, setPopularMovies] = useState([])

     useEffect(()=>{
        let getMovies = async ()=> {
            let movies =  await make_api_call()
            console.log("api called")
            setPopularMovies(movies)
         }
        getMovies()
    },[]);
    
    return [popularMovies]
}