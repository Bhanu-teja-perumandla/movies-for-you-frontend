import { BrowserRouter as Router, Route, Routes, Navigate, Link, useNavigate } from 'react-router-dom';
import './App.css';
import Header from './Components/Header/Header';
import Home from './Components/Home/Home';
import Profile from './Components/Profile/Profile';
import SignUp from './Components/SignUp/SignUp';
import SignIn from './Components/SignIn/SignIn';
import { createContext, useEffect, useState } from 'react';
import Favorites from './Components/Favorites/Favorites';
import { useAPI } from './Hooks/useAPI';
import { urls } from './urls';

export const UserContext = createContext();
export const PopularMovieContext = createContext();
export const FavMoviesContext = createContext();
export const YourRatingsContext = createContext();

function App() {
  const [currentUser,setCurrentUser] = useState(localStorage.getItem("currentUser"));
  const [signedIn, setSignedIn] = useState(localStorage.getItem('token')? true:false);
  const [favMovies, setFavMovies] = useState([])
  const [yourRatings, setYourRatings] = useState([])
  const {data, makeRequest} = useAPI()
  const [popularMovies, setPopularMovies] = useState([]);

  useEffect(() => {
      makeRequest(urls.popularMovies, 'movies');
  }, []);

  useEffect(() => {
      if (data) {
          setPopularMovies(data);
      }
  }, [data]); 

  const signInUser = (user)=>{
    setSignedIn(true)
    setCurrentUser(user)
    localStorage.setItem("token", user.token)
    localStorage.setItem("currentUser", user.name)
  }
  const signOutUser = ()=>{
    setSignedIn(false)
    setCurrentUser(null)
    localStorage.removeItem('token')
    localStorage.removeItem('currentUser')
  }

  function updateFavMovies(movieId, navigate) {
    if(!signedIn) {
      navigate("/signIn");
      return;
    }
     setFavMovies(prevFavs => {
      return prevFavs.includes(movieId) ? prevFavs.filter(id => id!== movieId) : [...prevFavs, movieId]
     })
  }

  function updateYourRatings(movieId, rating, navigate) {
    if(!signedIn) {
      navigate("/signIn");
      return;
    }
    const newRating = Number(rating)
    setYourRatings(prevRatings => {
      if (prevRatings.find(movieRating=>movieRating.id===movieId)) {
        let newRatings = prevRatings.map(movieRating=>
            (movieRating.id===movieId?
               {
                        ...movieRating,
                        rating:newRating
                }: movieRating))
        return newRatings
      }
      else {
          return [...prevRatings,{id:movieId,rating:newRating}]
      }
    })
  }


  return (
    <UserContext.Provider 
       value={{
        signedIn,
        currentUser
      }}
    >
      <PopularMovieContext.Provider value={{popularMovies}} >
        <FavMoviesContext.Provider value={{favMovies, updateFavMovies}}>
          <YourRatingsContext.Provider value={{yourRatings, updateYourRatings}}>
            <Router>
              <Header signOutUser={signOutUser}/>
              <Routes>
                <Route exact path="/" element={<Home/>}/>
                <Route exact path="/profile" element={<Profile/>}/>
                <Route exact path="/favs" element={<Favorites/>}/>
                <Route exact path="/signUp" element={signedIn?<Navigate to="/"/>:<SignUp/>}/>
                <Route exact path="/signIn" element={signedIn?<Navigate to="/"/>:<SignIn signInUser={signInUser}/>}/>
                <Route exact path="*" element={<h1>Not found</h1>}/>
              </Routes>
            </Router>
          </YourRatingsContext.Provider>
        </FavMoviesContext.Provider>
      </PopularMovieContext.Provider>
    </UserContext.Provider>
  );
}

export default App;

