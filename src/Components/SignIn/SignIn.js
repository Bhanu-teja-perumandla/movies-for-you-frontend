import {useState} from "react";
import { Link, Navigate } from "react-router-dom";
import "./SignIn.css"

const SignIn = ()=>{
    const [isSignedIn, setIsSignedIn] = useState(false)
    const [message, setMessage] = useState("")
    function handleSubmit(event) {
        event.preventDefault()
        let newUser = {
            email : event.target.email.value,
            password : event.target.password.value,
        }
        let users = JSON.parse(localStorage.getItem("users"))||[]
        let message  = "Account not found"
        users.map(user=>{
           if(user.email===newUser.email && user.password===newUser.password){
              message = ""
              setIsSignedIn(true)
           }
           else if(user.email===newUser.email ){
               message = "password incorrect"
           }
        });
        setMessage(message)

    }

    return (
       <>
        {isSignedIn && <Navigate to="/"/>}
        <form onSubmit={handleSubmit} className="signin-form">
             <input type="email" required={true} placeholder="Email" id="email" className="form-input" />
             <input type="password" required={true} placeholder="Password" id="password" className="form-input"/>
             <button className="signin-btn">Sign In</button>
             {message && <p className="invalid-message">{message}</p>}
             <p className="signup-text">Don't have an account? <Link to="/signUp" className="signup-link">Sign Up</Link></p>
        </form>
        </> 
    );
}

export default SignIn;