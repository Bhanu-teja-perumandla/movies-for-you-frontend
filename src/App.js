import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import Header from './Components/Header/Header';
import Home from './Components/Home/Home';
import Profile from './Components/Profile/Profile';
import SignUp from './Components/SignUp/SignUp';
import SignIn from './Components/SignIn/SignIn';
import { createContext, useState } from 'react';
import Favorites from './Components/Favorites/Favorites';

export const UserContext = createContext();
export const FavMoviesContext = createContext();
export const YourRatingsContext = createContext();

function App() {
  const [currentUser,setCurrentUser] = useState(JSON.parse(localStorage.getItem("currentUser")));
  const [favMovies, setFavMovies] = useState([])
  const [yourRatings, setYourRatings] = useState([])

  const signInUser = (user)=>{
    setCurrentUser(user)
    localStorage.setItem("currentUser",JSON.stringify(user))
  }
  const signOutUser = ()=>{
    setCurrentUser(null)
    localStorage.removeItem("currentUser")
  }

  function updateFavMovies(movieId) {
     setFavMovies(prevFavs => {
      return prevFavs.includes(movieId) ? prevFavs.filter(id => id!== movieId) : [...prevFavs, movieId]
     })
  }

  function updateYourRatings(movieId, rating) {
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
        currentUser: currentUser,
      }}
    >
      <FavMoviesContext.Provider value={{favMovies, updateFavMovies}}>
        <YourRatingsContext.Provider value={{yourRatings, updateYourRatings}}>
          <Router>
            <Header signOutUser={signOutUser}/>
            <Routes>
              <Route exact path="/" element={<Home/>}/>
              <Route exact path="/profile" element={<Profile/>}/>
              <Route exact path="/favs" element={<Favorites/>}/>
              <Route exact path="/signUp" element={currentUser?<Navigate to="/"/>:<SignUp/>}/>
              <Route exact path="/signIn" element={currentUser?<Navigate to="/"/>:<SignIn signInUser={signInUser}/>}/>
              <Route exact path="*" element={<h1>Not found</h1>}/>
            </Routes>
          </Router>
        </YourRatingsContext.Provider>
      </FavMoviesContext.Provider>
    </UserContext.Provider>
  );
}

export default App;

