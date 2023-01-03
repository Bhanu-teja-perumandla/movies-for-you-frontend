import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../../App";
import MovieCard from "../MovieCard/MovieCard";
import "./Favorites.css"

const Favorites = (props) => {
    const {currentUser, userDetails, updateUserDetails} = useContext(UserContext);

    const {popularMovies,updateYourRating,updateFavorites} = props;
    const favMovies = popularMovies.filter(movie=> userDetails.favMovies.includes(movie.id))

    
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
                            isFavorite={true}
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