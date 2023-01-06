import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { FavMoviesContext, UserContext } from "../../App";
import { useAPI } from "../../Hooks/useAPI";
import MovieCard from "../MovieCard/MovieCard";
import "./Favorites.css"

const Favorites = () => {
    const {currentUser} = useContext(UserContext);
    const favMovieIds = useContext(FavMoviesContext).favMovies

    const [popularMovies] = useAPI();
    const favMovies = currentUser?popularMovies.filter(movie=> favMovieIds.includes(movie.id)):[]

    
    return (
        <>
            {
                currentUser? 
                <div className="favorite-heading">
                    
                    <h2>{currentUser.name}'s favorites</h2>
                    
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