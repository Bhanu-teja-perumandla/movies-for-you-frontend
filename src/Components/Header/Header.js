import "./Header.css"
const Header = ()=>{
    return(
        <nav className="header-nav">
            <h1>MoviesForYou</h1>
            <div className="nav-right-options">
            <h3>Settings</h3>
            <h3>Profile</h3>  
            </div>
        </nav>)
}

export default Header;