import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../../App";
import "./Profile.css"

const Profile = () => {

    const user = useContext(UserContext)
    return (
        <>
            {
                user? 
                <div className="profile">
                    <h2>Profile</h2>
                    <p>Name  : {user.name}</p>
                    <p>Email : {user.email}</p>
                </div> 
                : 
                <Navigate to="/signIn"/>
            }
        </>
    )
}

export default Profile;