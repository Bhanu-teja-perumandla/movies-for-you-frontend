import { useAPI } from "../../Hooks/useAPI";
import MovieCard from "../MovieCard/MovieCard";
import "./Home.css"


const Home = () => {
    const [popularMovies] = useAPI()

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