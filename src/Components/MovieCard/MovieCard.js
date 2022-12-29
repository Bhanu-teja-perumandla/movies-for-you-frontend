import "./MovieCard.css"

const MovieCard = (props) => {
    return (
        <div className="movie-card">
            <img src={props.poster} alt="movie poster goes here" className="movie-poster"/>
            <h1 className="movie-title">{props.movieName}</h1>
            <h4 className="movie-rating">{props.rating}/10</h4>
            <p className="movie-description">{props.description}</p>
        </div>
    )
}

export default MovieCard;