import { useContext } from "react"
import "./MovieCard.css"
import { UserContext } from "../../App"

const MovieCard = (props) => {
    const {currentUser} = useContext(UserContext);
    const {id,poster,movieName,rating,description} = props.movie

    return (
        <div className="movie-card">
            <img src={poster} alt="movie poster goes here" className="movie-poster"/>
            <h1 className="movie-title">{movieName}</h1>
            <h4 className="movie-rating">{rating}/10</h4>
            {currentUser &&<label htmlFor="your-rating" className="your-rating">Your Rating <input type="text" id="your-rating" value={props.yourRating} onChange={(event)=>props.updateYourRating(event,id)}/> Stars</label>}
            {currentUser &&<label htmlFor="favorite" className="favorite">Favorite <input id="isFavorite" type="checkbox" checked={props.isFavorite} onChange={(event)=>props.updateIsFavorite(event,id)}/></label>}
            <p className="movie-description">{description}</p>
        </div>
    )
}

export default MovieCard;