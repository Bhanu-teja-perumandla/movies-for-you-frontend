import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./SignUp.css"
import { useAPI } from "../../Hooks/useAPI";
import { urls } from "../../urls";

const SignUp = ()=>{
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("")
    const navigate = useNavigate()
    const {data, error, makeRequest} = useAPI();

    function handleSubmit(event) {
        event.preventDefault()
        if(password!==confirmPassword) {
            setMessage("Passwords do not match!");
            return;
        }
        setMessage("");
        makeRequest(urls.signUp, 'signup', {username, password, role: "USER"});
    }

    useEffect(() => {
        if (error) {
            setMessage("Something went wrong, try again...");
        } else if(data.message) {
            setMessage(""); 
            navigate("/signIn")
            return;
        }
    }, [data, error]);

    return(
        <>
            <form className="signup-form" onSubmit={handleSubmit}>
                <input type="text" value={username} required={true} placeholder="User Name" id="username" className="form-input" onChange={(e)=>setUsername(e.target.value)}/>
                <input type="password" value={password} required={true} placeholder="Password" id="password" className="form-input" onChange={(e)=>setPassword(e.target.value)}/>
                <input type="password" value={confirmPassword} required={true} placeholder="Confirm Password" id="confirmPassword" className="form-input" onChange={(e)=>setConfirmPassword(e.target.value)}/>
                <button className="signup-btn">Sign Up</button>
                {message && <p className="invalid-message">{message}</p>}
                <p className="signin-text">Already have an account? <Link to="/signIn" className="signin-link">Sign In</Link></p>
            </form>
        </>
    );
}

export default SignUp;
