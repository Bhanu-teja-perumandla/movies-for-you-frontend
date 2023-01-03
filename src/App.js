import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Favorites from './Components/Favorites/Favorites';
import Header from './Components/Header/Header';
import Home from './Components/Home/Home';
import Profile from './Components/Profile/Profile';
import SignUp from './Components/SignUp/SignUp';
import SignIn from './Components/SignIn/SignIn';
import { createContext, useEffect, useState } from 'react';

export const UserContext = createContext();

function App() {
  const [currentUser,setCurrentUser] = useState(JSON.parse(localStorage.getItem("currentUser")));

  let [userDetails, setUserDetails] = useState(null)

 console.log("current user :",currentUser," userDetails :",userDetails)
  useEffect(()=>{
    let newUserDetails = []
    if (currentUser) {
      let allDetails = JSON.parse(localStorage.getItem("users")).find(userDetails => userDetails.email === currentUser.email)
      newUserDetails =  {
        email: allDetails.email,
        favMovies: allDetails.favMovies?? [],
        ratings: allDetails.ratings?? []
      }
    }
    setUserDetails(newUserDetails)

  },[currentUser])

  const signInUser = (user)=>{
    setCurrentUser(user)
    localStorage.setItem("currentUser",JSON.stringify(user))
  }
  const signOutUser = ()=>{
    setCurrentUser(null)
    localStorage.removeItem("currentUser")
  }

  function updateUserDetails(updatedUserDetails) {
    console.log("user details updated", updatedUserDetails, currentUser)
    setUserDetails(updatedUserDetails)
    let users = JSON.parse(localStorage.getItem("users"))
    let newUsers = users.map(user =>
      user.email === updatedUserDetails.email ? 
                    {...user,
                      ...updatedUserDetails
                    } : user
    )
    console.log(newUsers)
    localStorage.setItem("users", JSON.stringify(newUsers))
  }


  return (
    <UserContext.Provider 
       value={{
        currentUser: currentUser,
        userDetails: userDetails, 
        updateUserDetails: updateUserDetails
      }}
    >
      <Router>
        <Header signOutUser={signOutUser}/>
        <Routes>
          <Route exact path="/" element={<Home displayFavorites={false}/>}/>
          <Route exact path="/profile" element={<Profile/>}/>
          <Route exact path="/favs" element={<Home displayFavorites={true} />}/>
          <Route exact path="/signUp" element={<SignUp/>}/>
          <Route exact path="/signIn" element={<SignIn signInUser={signInUser}/>}/>
          <Route exact path="*" element={<h1>Not found</h1>}/>
        </Routes>
      </Router>
    </UserContext.Provider>
  );
}

export default App;

