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
            <div className="bg-container">
            <NavbarHome/>
            {/* <div style={{display: isShown ? 'block' : 'none'}}> */}
            <Container>
                <Login setToken={setToken}/>
            </Container>
            {/* </div> */}
            </div>
        </>
    );
}
// export  {displaySignup};
export default Home;