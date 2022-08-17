// import { useState } from "react";

// Components Imports
import NavbarTemp from "../Navbar/Navbar";
import Login from "./Login";
// Bootstrap imports
import { Container } from "react-bootstrap";

const Home = () =>{
    // const [isShown, setIsShown] = useState(true);
    // const displaySignup = Event =>{
    //     setIsShown(current =>!current);
    // };

    return(
        <>
            <div className="bg-container">
            <NavbarTemp/>
            {/* <div style={{display: isShown ? 'block' : 'none'}}> */}
            <Container>
                <Login/>
            </Container>
            {/* </div> */}
            </div>
        </>
    );
}
// export  {displaySignup};
export default Home;