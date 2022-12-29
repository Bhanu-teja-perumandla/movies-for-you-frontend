import Header from "../Header/Header";
import MovieCard from "../MovieCard/MovieCard";
import "./Home.css"

const Home = () => {
    return(
    <div className = "home-comp">
     <Header></Header>
     <MovieCard 
        movieName="MovieName"
        rating={6}
        description="Movie was average"
        poster="./logo512.png"
     />
    </div>);
}

export default Home;