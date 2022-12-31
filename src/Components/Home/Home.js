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
          return {
              id:ele.id,
              movieName:ele.original_title,
              rating:ele.vote_average,
              poster:"http://image.tmdb.org/t/p/w500/"+ele.poster_path,
              description:ele.overview,
              yourRating:0
          }
        })
        updatePopularMovies(movies);
       }catch(e){
          console.log("error"+e)
        }
    }

    function updateYourRating(event, movie_id) {
        const value = event.target.value
        console.log(value)
        const yesOrNo = /^([0-9]+)$/.test(value)
        let newRating = yesOrNo ? (value>10? 10: (value.length>2? value.substring(1, value.length): value)): 0
        console.log(newRating)
        updatePopularMovies(prevMovies => {
            return prevMovies.map(movie=> {
                 return movie.id === movie_id ? {...movie, yourRating:newRating} : movie
               })
        })
    }

    return(
    <div className = "home-comp">
     <Header></Header>
     <div className="movies-list">
         {popularMovies.map((movie)=>{
    return (<MovieCard 
        key={movie.id}
        movieName={movie.movieName}
        rating={movie.rating}
        movieId={movie.id}
        description={movie.description}
        poster={movie.poster}
        yourRating={movie.yourRating}
        updateYourRating={updateYourRating}
     />)
         })
     }
     </div>
    </div>);
}

export default Home;