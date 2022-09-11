// Components Imports
import NavbarStudent from "../Navbar/NavbarStudent";
// Bootstrap imports
import { Container } from "react-bootstrap";

const StudentHome = () =>{
    // const [isShown, setIsShown] = useState(true);
    // const displaySignup = Event =>{
    //     setIsShown(current =>!current);
    // };

    return(
        <>
            <div className="bg-container">
            <NavbarStudent/>
            </div>
        </>
    );
}
// export  {displaySignup};
export default StudentHome;