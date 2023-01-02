import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Favorites from './Components/Favorites/Favorites';
import Header from './Components/Header/Header';
import Home from './Components/Home/Home';
import Profile from './Components/Profile/Profile';
import SignUp from './Components/SignUp/SignUp';
import SignIn from './Components/SignIn/SignIn';
import { createContext, useState } from 'react';

export const UserContext = createContext();

function App() {
  const [currentUser,setCurrentUser] = useState(JSON.parse(localStorage.getItem("currentUser")));
  const signInUser = (user)=>{
    setCurrentUser(user)
    localStorage.setItem("currentUser",JSON.stringify(user))
  }
  const signOutUser = ()=>{
    setCurrentUser(null)
    localStorage.removeItem("currentUser")
  }
  return (
    <UserContext.Provider value={currentUser}>
      <Router>
        <Header signOutUser={signOutUser}/>
        <Routes>
          <Route exact path="/" element={<Home/>}/>
          <Route exact path="/profile" element={<Profile/>}/>
          <Route exact path="/favs" element={<Favorites/>}/>
          <Route exact path="/signUp" element={<SignUp/>}/>
          <Route exact path="/signIn" element={<SignIn signInUser={signInUser}/>}/>
          <Route exact path="*" element={<h1>Not found</h1>}/>
        </Routes>
      </Router>
    </UserContext.Provider>
  );
}

export default App;

