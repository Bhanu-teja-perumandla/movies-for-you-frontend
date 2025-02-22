import { useContext } from "react";
import { useAPI } from "../../Hooks/useAPI";
import { urls } from "../../urls";
import MovieCard from "../MovieCard/MovieCard";
import "./Home.css"
import { PopularMovieContext } from "../../App";


const Home = () => {
    const {popularMovies} = useContext(PopularMovieContext);
    return(
        <div className="movies-list">
            {
                popularMovies.map((movie)=>{
                                return (<MovieCard 
                                    key={movie.id}
                                    movie={movie}
                                />)
                            })
            }
        </div>
    )
}

export default Home;