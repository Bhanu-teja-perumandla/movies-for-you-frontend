import {useState} from "react";
import { Link} from "react-router-dom";
import "./SignIn.css"

const SignIn = (props)=>{
    const [message, setMessage] = useState("")
   
    function handleSubmit(event) {
        let formElements = event.target.elements;
        event.preventDefault()
        let newUser = {
            email : formElements.email.value,
            password : formElements.password.value,
        }
        let users = JSON.parse(localStorage.getItem("users"))||[]
        let message  = "Account not found"
        users.map(user => {
           if(user.email===newUser.email && user.password===newUser.password){
              message = ""
              props.signInUser({
                  name:`${user.firstName} ${user.lastName}`,
                  email: user.email
              })
           }
           else if(user.email===newUser.email ){
               message = "Password incorrect"
           }
        });
        setMessage(message)
    }

    return (
        <form onSubmit={handleSubmit} className="signin-form">
             <input type="email" required={true} placeholder="Email" id="email" className="form-input" />
             <input type="password" required={true} placeholder="Password" id="password" className="form-input"/>
             <button className="signin-btn">Sign In</button>
             {message && <p data-testid="invalid-message" className="invalid-message">{message}</p>}
             <p className="signup-text">Don't have an account? <Link to="/signUp" className="signup-link">Sign Up</Link></p>
        </form>
    );
}

export default SignIn;