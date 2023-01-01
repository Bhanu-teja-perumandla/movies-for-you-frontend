import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import "./SignUp.css"

const SignUp = ()=>{
    const [userDetails, setUserDetails] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: ""
    })
    const [isSignedUp, setIsSignedUp] = useState(false)

    function handleSubmit(event) {
        event.preventDefault()
        console.log(userDetails)
        let users = JSON.parse(localStorage.getItem("users")) || []
        users.push(userDetails)
        localStorage.setItem("users",JSON.stringify(users))
        setIsSignedUp(true)
    }
    function handleChange(event) {
        let id = event.target.id
        let value = event.target.value
        setUserDetails(prevDetails => {
            return {
                ...prevDetails,
                [id] : value
            }
        })
    }
    return(
        <>
            {isSignedUp && <Navigate to="/"/>}
            <form className="signup-form" onSubmit={handleSubmit}>
                <input type="text" required={true} placeholder="First Name" id="firstName" className="form-input" onChange={handleChange}/>
                <input type="text" required={true} placeholder="Last Name" id="lastName" className="form-input" onChange={handleChange}/>
                <input type="email" required={true} placeholder="Email" id="email" className="form-input" onChange={handleChange}/>
                <input type="password" required={true} placeholder="Password" id="password" className="form-input" onChange={handleChange}/>
                <input type="password" required={true} placeholder="Confirm Password" id="confirmPassword" className="form-input" onChange={handleChange}/>
                <button className="signup-btn">Sign Up</button>
            </form>
        </>
    );
}

export default SignUp;
