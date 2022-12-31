import { useState } from "react";
import "./Header.css"
import {Link} from 'react-router-dom'

const Header = ()=>{
    const [showProfileOptions, setProfileOptions] = useState(false);
    function myFunction() {
        setProfileOptions(prev => !prev);
      }

    return(
        <nav className="header-nav">
            <Link to="/" className="app-name">MoviesForYou</Link>
            <div className="nav-right-options">
                <Link to="/favs" className="route-link">Favorites</Link>
                <div className="dropdown">
                <Link to="/"
                onClick = {myFunction}
                className="route-link">Options</Link>
                <div id="myDropdown" className={`dropdown-content ${showProfileOptions?"show":""}`}>
                    <Link to="/profile" onClick = {myFunction} className="profile-links">My Profile</Link>
                    <Link to="/signIn" onClick = {myFunction} className="profile-links">Sign In</Link>
                </div>
                </div> 
            </div>
            
        </nav>)
}

export default Header;


