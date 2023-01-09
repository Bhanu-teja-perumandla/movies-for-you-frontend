import { getMoviesFrom, useAPI } from "../../Hooks/useAPI";
import { urls } from "../../urls";
import MovieCard from "../MovieCard/MovieCard";
import "./Home.css"


const Home = () => {
    const [data] = useAPI(urls.popularMovies)
    const popularMovies = getMoviesFrom(data)

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