import { useEffect, useState } from "react";
import Header from "../Header/Header";
import MovieCard from "../MovieCard/MovieCard";
import keys from "../../access-info"
import "./Home.css"


const Home = () => {
    
    const [popularMovies, updatePopularMovies] = useState([]);
   
    useEffect(()=>{
        make_api_call()
    },[]);

    let make_api_call = async ()=>{
     try{
     let raw_response = await fetch("https://api.themoviedb.org/3/movie/popular?api_key="+keys.tmdbApiKey);
     let response = await raw_response.json();
     let results = response.results;
        let movies = results.map((ele)=>{
          let x = {
              movieName:ele.original_title,
              rating:ele.vote_average,
              poster:"http://image.tmdb.org/t/p/w500/"+ele.poster_path,
              description:ele.overview,

          }
          return x;
        })
        updatePopularMovies(movies);
       }catch(e){
          console.log("error"+e)
        }
    }

    return(
    <div className = "home-comp">
     <Header></Header>
     <div className="movies-list">
         {popularMovies.map((movie)=>{
    return (<MovieCard 
        movieName={movie.movieName}
        rating={movie.rating}
        description={movie.description}
        poster={movie.poster}
     />)
         })
     }
     </div>
    </div>);
}

export default Home;