import { useContext, useEffect, useState } from "react";
import MovieCard from "../MovieCard/MovieCard";
import keys from "../../access-info"
import "./Home.css"
import Favorites from "../Favorites/Favorites";
import { UserContext } from "../../App";


const Home = (props) => {
    
    const {currentUser, userDetails, updateUserDetails} = useContext(UserContext);
    const [popularMovies, updatePopularMovies] = useState([]);
   
    useEffect(()=>{
        make_api_call()
    },[]);

    let make_api_call = async ()=>{
    if (JSON.parse(localStorage.getItem("popularMovies"))){
        let popularMovies = JSON.parse(localStorage.getItem("popularMovies"))
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

        if (isChecked) {
             updateUserDetails({...userDetails, favMovies: [...userDetails.favMovies, movieId]})
        }
        else {
            let newFavMovies = userDetails.favMovies
            let index = newFavMovies.indexOf(movieId)
            newFavMovies.splice(index,1)
            updateUserDetails({...userDetails, favMovies: newFavMovies})
        }

    }

    function updateYourRating(event, movieId) {
        const newRating = Number(event.target.value)
        if (userDetails.ratings.find(movieRating=>movieRating.movieId===movieId)) {
            let newRatings = userDetails.ratings.map(movieRating=>
                (movieRating.movieId==movieId?
                   {
                            ...movieRating,
                            rating:newRating
                    }: movieRating))
            updateUserDetails({...userDetails,ratings:newRatings})
       }
       else {
           updateUserDetails({...userDetails, ratings: [...userDetails.ratings,{movieId:movieId,rating:newRating}]})
       }

    }

    return(
     <>
         {props.displayFavorites ? 
            <Favorites 
                popularMovies={popularMovies}
                updateYourRating={updateYourRating}
                updateFavorites={updateFavorites} 
            />
            :  
            <div className="movies-list">
                {
                    popularMovies.map((movie)=>{
                                    return (<MovieCard 
                                        key={movie.id}
                                        movie={movie}
                                        isFavorite={currentUser?(userDetails.favMovies??[]).includes(movie.id):false}
                                        yourRating={currentUser?(((userDetails.ratings??[]).find(movieRating=>movieRating.movieId===movie.id)??{rating:0}).rating):0}
                                        updateYourRating={updateYourRating}
                                        updateIsFavorite={updateFavorites} 
                                    />)
                                })
                 }
            </div>
         }
    </>);
}

export default Home;