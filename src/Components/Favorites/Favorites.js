import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../../App";
import MovieCard from "../MovieCard/MovieCard";
import "./Favorites.css"

const Favorites = (props) => {
    const user = useContext(UserContext);

    const {popularMovies,updateYourRating,updateFavorites} = props;
    const favMovies = popularMovies.filter(movie=> movie.isFavorite)

    
    return (
        <>
            {
                user? 
                <div className="favorite-heading">
                    
                    <h2>{user.name}'s favorites</h2>
                    
                    <div className="favorites">
                        {favMovies.map(movie => <MovieCard
                            key={movie.id}
                            movie={movie}
                            updateYourRating={updateYourRating}
                            updateIsFavorite={updateFavorites}
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