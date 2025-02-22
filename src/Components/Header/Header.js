import { useContext, useState } from "react";
import "./Header.css"
import {Link} from 'react-router-dom'
import { UserContext } from "../../App";

const Header = (props)=>{
    const [showProfileOptions, setProfileOptions] = useState(false);
    function myFunction() {
        setProfileOptions(prev => !prev);
      }

    const user = useContext(UserContext).signedIn

    return(
        <nav className="header-nav">
            <Link to="/" className="app-name"><img src={require("../../images/MoviesForYou.png")} className="logo" alt="our app logo which contains a popcorn bucket"/>MoviesForYou</Link>
            <div className="nav-right-options">
                <Link to="/favs" className="route-link">Favorites</Link>
                <div className="dropdown"
                onMouseEnter={myFunction}
                onMouseLeave={myFunction}>
                <div
                className="route-link">Options</div>
                {showProfileOptions && <div id="myDropdown" className={`dropdown-content`} onMouseLeave={myFunction}>
                {/* <div id="myDropdown" className={`dropdown-content ${showProfileOptions?"show":""}`} onMouseLeave={myFunction}> */}
                    <Link to="/profile" onClick = {myFunction} className="profile-links">My Profile</Link>
                    <Link 
                        to={user? "/":"/signIn"} 
                        onClick = {
                                user? 
                                ()=>{
                                    props.signOutUser(); 
                                    myFunction()
                                }:myFunction
                            } 
                        className="profile-links"
                    >
                        {user? "Sign Out":"Sign In"}
                    </Link>
                </div>}
                </div> 
            </div>
            
        </nav>)
}

export default Header;


