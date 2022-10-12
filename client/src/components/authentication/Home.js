// import { useState } from "react";

// Components Imports
import NavbarHome from "../Navbar/NavbarHome";
import Login from "./Login";
// Bootstrap imports
import { Container } from "react-bootstrap";

const Home = ({setToken}) =>{
    // const [isShown, setIsShown] = useState(true);
    // const displaySignup = Event =>{
    //     setIsShown(current =>!current);
    // };

    return(
        <>
            <div className="vlogin-background">
            {/* <NavbarHome/> */}
            {/* <div style={{display: isShown ? 'block' : 'none'}}> */}
            
                <Login setToken={setToken}/>
            
            {/* </div> */}
            </div>
        </>
    );
}
// export  {displaySignup};
export default Home;