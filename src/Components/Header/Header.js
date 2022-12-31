import "./Header.css"
import {Link} from 'react-router-dom'

const Header = ()=>{
    return(
        <nav className="header-nav">
            <Link to="/" className="app-name">MoviesForYou</Link>
            <div className="nav-right-options">
                <Link to="/favs" className="route-link">Favs</Link>
                <Link to="/profile" className="route-link">Profile</Link>
            </div>
        </nav>)
}

export default Header;