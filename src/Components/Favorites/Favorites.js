import { useContext } from "react";
import { UserContext } from "../../App";

const Favorites = () => {
    const value = useContext(UserContext);
    return (
    
        <h1>these are my favs {value?value.name:"xyz"}</h1>
    )
}

export default Favorites;