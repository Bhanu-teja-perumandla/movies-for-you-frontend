import "./MovieCard.css"

const MovieCard = (props) => {
    const {poster,movieName,rating,description,yourRating} = props.movie
    return (
        <div className="movie-card">
            <img src={poster} alt="movie poster goes here" className="movie-poster"/>
            <h1 className="movie-title">{movieName}</h1>
            <h4 className="movie-rating">{rating}/10</h4>
            <label htmlFor="your-rating" className="your-rating">Your Rating <input type="text" id="your-rating" value={yourRating} onChange={(event)=>props.updateYourRating(event,props.movieId)}/> Stars</label>
            <p className="movie-description">{description}</p>
        </div>
    )
}

export default MovieCard;