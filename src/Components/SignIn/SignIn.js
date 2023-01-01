import { useDebugValue, useState } from "react";
import { Link } from "react-router-dom";
import "./SignIn.css"

const SignIn = ()=>{
    const [userDetails, setUserDetails] = useState({
        email: "",
        password: ""
    })
    console.log(userDetails)
    function handleSubmit(event) {
        event.preventDefault()
        let newUser = {
            email : event.target.email.value,
            password : event.target.password.value,
        }
        setUserDetails(()=>{
            return newUser
        })
    }

    return (
        <form onSubmit={handleSubmit} className="signin-form">
             <input type="email" required={true} placeholder="Email" id="email" className="form-input" />
             <input type="password" required={true} placeholder="Password" id="password" className="form-input"/>
             <button className="signin-btn">Sign In</button>
             <p className="signup-text">Don't have an account? <Link to="/signUp" className="signup-link">Sign Up</Link></p>
        </form>
    );
}

export default SignIn;

// {/* <h3>Sign In Page</h3>
// <Link to="/home">Sign In</Link> */}