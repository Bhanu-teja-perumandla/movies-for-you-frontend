import "./MovieCard.css"

const MovieCard = (props) => {
    return (
        <div className="movie-card">
            <img src={props.poster} alt="movie poster goes here" className="movie-poster"/>
            <h1 className="movie-title">{props.movieName}</h1>
            <h4 className="movie-rating">{props.rating}/10</h4>
            <label htmlFor="your-rating" className="your-rating">Your Rating <input type="text" id="your-rating" value={props.yourRating} onChange={(event)=>props.updateYourRating(event,props.movieId)}/> Stars</label>
            <p className="movie-description">{props.description}</p>
        </div>
    )
}

export default MovieCard;