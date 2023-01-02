import { useEffect, useState } from "react";
import MovieCard from "../MovieCard/MovieCard";
import keys from "../../access-info"
import "./Home.css"


const Home = () => {
    
    const [popularMovies, updatePopularMovies] = useState([]);
   
    useEffect(()=>{
        make_api_call()
    },[]);

    let make_api_call = async ()=>{
    if (JSON.parse(localStorage.getItem("popularMovies"))){
        let popularMovies = JSON.parse(localStorage.getItem("popularMovies"))
        console.log("getting values from local storage");
        updatePopularMovies(popularMovies)
    }
    else{
     try{
     let raw_response = await fetch("https://api.themoviedb.org/3/movie/popular?api_key="+keys.tmdbApiKey);
     let response = await raw_response.json();
     let results = response.results;
        let movies = results.map((movie)=>{
          return {
              id:movie.id,
              movieName:movie.original_title,
              rating:movie.vote_average,
              poster:"http://image.tmdb.org/t/p/w500/"+movie.poster_path,
              description:movie.overview,
              yourRating:0,
              isFavorite:false
          }
        })
        localStorage.setItem("popularMovies",JSON.stringify(movies));
        updatePopularMovies(movies);
       }catch(e){
          console.log("error"+e)
        }
    }
    }

    function updateFavorites(event,movieId){
        const isChecked = event.target.checked

        updatePopularMovies(prevMovies => {
            let popularMovies = prevMovies.map(movie=> {
                 return movie.id === movieId ? {...movie, isFavorite:isChecked} : movie
               })
               localStorage.setItem("popularMovies",JSON.stringify(popularMovies));
               return popularMovies;
        })

    }

    function updateYourRating(event, movieId) {
        const value = event.target.value
        console.log(value)
        const yesOrNo = /^([0-9]+)$/.test(value)
        let newRating = yesOrNo ? (value>10? 10: (value.length>2? value.substring(1, value.length): value)): 0
        console.log(newRating)
        
        updatePopularMovies(prevMovies => {
            let popularMovies = prevMovies.map(movie=> {
                 return movie.id === movieId ? {...movie, yourRating:newRating} : movie
               })
               localStorage.setItem("popularMovies",JSON.stringify(popularMovies));
               return popularMovies;
        })

    }

    return(
     <div className="movies-list">
         {popularMovies.map((movie)=>{
            return (<MovieCard 
                key={movie.id}
                movie={movie}
                updateYourRating={updateYourRating}
                updateIsFavorite={updateFavorites} 
            />)
                })
            }
    </div>);
}

export default Home;