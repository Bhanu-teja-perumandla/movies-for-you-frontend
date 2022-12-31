import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Favorites from './Components/Favorites/Favorites';
import Header from './Components/Header/Header';
import Home from './Components/Home/Home';
import Profile from './Components/Profile/Profile';
import SignUp from './Components/SignUp/SignUp';
import SignIn from './Components/SignIn/SignIn';

function App() {

  return (
    <div className="App">
      <Router>
        <Header/>
        <Routes>
          <Route exact path="/" element={<Home/>}/>
          <Route exact path="/profile" element={<Profile/>}/>
          <Route exact path="/favs" element={<Favorites/>}/>
          <Route exact path="/signUp" element={<SignUp/>}/>
          <Route exact path="/signIn" element={<SignIn/>}/>
          <Route exact path="*" element={<h1>Not found</h1>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
