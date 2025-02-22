import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { FavMoviesContext, PopularMovieContext, UserContext } from "../../App";
import { getMoviesFrom, useAPI } from "../../Hooks/useAPI";
import { urls } from "../../urls";
import MovieCard from "../MovieCard/MovieCard";
import "./Favorites.css"

const Favorites = () => {
    const {currentUser} = useContext(UserContext);
    const favMovieIds = useContext(FavMoviesContext).favMovies
    const {popularMovies} = useContext(PopularMovieContext);
    const favMovies = currentUser?popularMovies.filter(movie=> favMovieIds.includes(movie.id)):[]
    
    return (
        <>
            {
                currentUser? 
                <div className="favorite-heading">
                    
                    <h2>{currentUser}'s favorites</h2>
                    
                    <div className="favorites">
                        {favMovies.map(movie => <MovieCard
                            key={movie.id}
                            movie={movie}
                        />)}
                    </div> 
                </div>
                : 
                <Navigate to="/signIn"/>
            }
        </>
    )
}

export default Favorites;