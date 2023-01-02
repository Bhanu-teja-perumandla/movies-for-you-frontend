import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../../App";
import "./Favorites.css"

const Favorites = () => {
    const user = useContext(UserContext);
    
    return (
        <>
            {
                user? 
                <div className="favorites">
                    <p>{user.name}'s favorites go here</p>

                </div> 
                : 
                <Navigate to="/signIn"/>
            }
        </>
    )
}

export default Favorites;