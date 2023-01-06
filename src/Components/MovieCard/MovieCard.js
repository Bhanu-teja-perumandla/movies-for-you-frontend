import { useContext } from "react"
import "./MovieCard.css"
import { FavMoviesContext, UserContext, YourRatingsContext } from "../../App"
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import { Checkbox, Rating } from "@mui/material";

const MovieCard = (props) => {
    const {currentUser} = useContext(UserContext);
    const {favMovies, updateFavMovies} = useContext(FavMoviesContext);
    const {yourRatings, updateYourRatings} = useContext(YourRatingsContext);
    const {id,poster,movieName,rating,description} = props.movie

    const yourRating = (yourRatings.find(rating => rating.id === id)?? {rating:0}).rating
    const isFavorite = favMovies.includes(id)

    return (
        <div className="movie-card">
            <img src={poster} alt="movie poster goes here" className="movie-poster"/>
            <h1 className="movie-title">{movieName}</h1>
            {currentUser &&<label htmlFor="favorite" className="favorite"><Checkbox data-testid="favorite" id="isFavorite" icon={<FavoriteBorder color="error"/>} checkedIcon={<Favorite/>} checked={isFavorite} color="error" onChange={()=>updateFavMovies(id)} /></label>}
            <h4 className="movie-rating">{rating}/10</h4>
            {currentUser &&<label htmlFor="your-rating"><Rating data-testid="your-rating" id="your-rating" value={yourRating} onChange={(event)=>updateYourRatings(id, event.target.value)} precision={0.5}/></label>}
            <p className="movie-description">{description}</p>
        </div>
    )
}

export default MovieCard;