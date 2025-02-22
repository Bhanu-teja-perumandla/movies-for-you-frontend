import {useState, useEffect} from "react";
import { Link} from "react-router-dom";
import "./SignIn.css"
import { useAPI } from "../../Hooks/useAPI";
import { urls } from "../../urls";

const SignIn = (props)=>{
    const [message, setMessage] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const {data, error, makeRequest} = useAPI();
   
    const handleSubmit = async (event) => {
        event.preventDefault()
        setMessage(""); 
        makeRequest(urls.signIn, 'signin', {username: name, password: password});
    };

    useEffect(() => {
        if (error) {
            setMessage("Something went wrong, try again...");
        } else if (data?.token) {
            setMessage(""); 
            props.signInUser({ name, token: data.token });
        }
    }, [data, error]);

    return (
        <form onSubmit={handleSubmit} className="signin-form">
             <input type="name" value= {name} onChange={(e)=> setName(e.target.value)} required={true} placeholder="Username" id="name" className="form-input" />
             <input type="password" value= {password} onChange={(e)=> setPassword(e.target.value)} required={true} placeholder="Password" id="password" className="form-input"/>
             <button className="signin-btn">Sign In</button>
             {message && <p data-testid="invalid-message" className="invalid-message">{message}</p>}
             <p className="signup-text">Don't have an account? <Link to="/signUp" className="signup-link">Sign Up</Link></p>
        </form>
    );
}

export default SignIn;