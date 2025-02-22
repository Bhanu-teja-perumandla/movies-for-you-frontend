import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../../App";
import "./Profile.css"

const Profile = () => {

    const {signedIn, currentUser} = useContext(UserContext)
    return (
        <>
            {
                signedIn? 
                <div className="profile">
                    <h2>Profile</h2>
                    <p>Name  : {currentUser}</p>
                    <p>Email : WIP</p>
                </div> 
                : 
                <Navigate to="/signIn"/>
            }
        </>
    )
}

export default Profile;