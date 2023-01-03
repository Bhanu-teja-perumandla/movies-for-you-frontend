import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../../App";
import "./Profile.css"

const Profile = () => {

    const {currentUser} = useContext(UserContext)
    return (
        <>
            {
                currentUser? 
                <div className="profile">
                    <h2>Profile</h2>
                    <p>Name  : {currentUser.name}</p>
                    <p>Email : {currentUser.email}</p>
                </div> 
                : 
                <Navigate to="/signIn"/>
            }
        </>
    )
}

export default Profile;