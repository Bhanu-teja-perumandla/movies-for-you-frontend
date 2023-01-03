import { useContext } from "react"
import "./MovieCard.css"
import { UserContext } from "../../App"
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import { Checkbox } from "@mui/material";

const MovieCard = (props) => {
    const {currentUser} = useContext(UserContext);
    const {id,poster,movieName,rating,description} = props.movie

    return (
        <div className="movie-card">
            <img src={poster} alt="movie poster goes here" className="movie-poster"/>
            <h1 className="movie-title">{movieName}</h1>
            {currentUser &&<label htmlFor="favorite" className="favorite"><Checkbox id="isFavorite" icon={<FavoriteBorder />} size="large" checkedIcon={<Favorite/>} checked={props.isFavorite} color="error" onChange={(event)=>props.updateIsFavorite(event,id)} /></label>}
            <h4 className="movie-rating">{rating}/10</h4>
            {currentUser &&<label htmlFor="your-rating" className="your-rating">Your Rating <input type="text" id="your-rating" value={props.yourRating} onChange={(event)=>props.updateYourRating(event,id)}/> Stars</label>}
            <p className="movie-description">{description}</p>
        </div>
    )
}

export default MovieCard;