import { useState, Fragment } from "react";
import  { useNavigate,Route, Link } from 'react-router-dom';
// Components Imports
import NavbarTemp from "../Navbar/NavbarHome";
// Bootstrap imports
import Container from "react-bootstrap/Container";
import { Button} from "react-bootstrap";
import { Form } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./signup.css"
import Alert_boot from '../Alert_boot';

const Signup = () =>{

    const navigate= useNavigate();
    const[alert, setAlert] = useState(null);

    const createAlert = (message, type)=> {
        setAlert({
            msg: message,
            type: type
        })
    }

    const [firstName, setFirstName] = useState("");
    const [surname, setSurname] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    
    const onFirstNameChange = e => setFirstName(e.target.value);
    const onSurnameChange = e => setSurname(e.target.value);
    const onUsernameChange = e => setUsername(e.target.value);
    const onEmailChange = e => setEmail(e.target.value);
    const onPasswordChange = e => setPassword(e.target.value);

    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            const body = {username, firstName, surname, email, password};
            const newUserRequest = await fetch("/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json"},
                body: JSON.stringify(body)
            });
            createAlert("Sign Up successful", "Success")
            navigate("/")
            console.log(newUserRequest);

        }catch(err) {
            createAlert("Please enter all details", "ERROR")
            console.error(err.message);
        }
    }
    return(
        <>
        <div className="v-home">
            <Alert_boot alert={alert}/>
            <div className="v-signup-background">
                <div className="v-signup">
                    <div className='v-signup-header'>
                        <div className='v-signup-heading'> Uni Timetable</div>
                        <div className='v-signup-heading-float'> <Link to='/' className='link'> Login</Link> </div>
                    </div>
                    <div className="v-signup-form">
                        <div className="v-signup-form-heading"> SIGN UP</div>
                        <div className="v-signup-form-input">
                        <Form onSubmit={handleSubmit}>
                        <Row>
                            <Col>
                                <Form.Group className="mb-3" controlId="first-name">
                                    <Form.Label sm="4">First Name</Form.Label>
                                        <Form.Control type="text"
                                            name="first-name"
                                            // value={test}
                                            // onChange={e => setTest(e.target.value)} 
                                            value={firstName}
                                            onChange={onFirstNameChange}
                                            placeholder="First Name" 
                                        />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group className="mb-3" controlId="surname">
                                    <Form.Label sm="4">Last Name</Form.Label>
                                    <Form.Control type="text"
                                        name="surname" 
                                        value={surname}
                                        onChange={onSurnameChange}
                                        placeholder="Last Name" 
                                    
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Group className="mb-3" controlId="studentID">
                                    <Form.Label>Student ID</Form.Label>
                                    <Form.Control type="text"
                                        name="studentID"
                                        value={username}
                                        onChange={onUsernameChange} 
                                        placeholder="Student ID" 
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Form.Group className="mb-3" controlId="emailID">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email"
                                    name="email"
                                    value={email}
                                    onChange={onEmailChange} 
                                    placeholder="Email" 
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="PasswordID">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password"
                                    name="password"
                                    value={password}
                                    onChange={onPasswordChange} 
                                    placeholder="Password" 
                                />
                            </Form.Group>
                            {/* <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Confirm Password</Form.Label>
                                <Form.Control type="password" placeholder="Confirm Password" />
                            </Form.Group> */}
                        </Row>
                        <Form.Group className="mb-3" controlId="formBasicCheckbox">
                            <Form.Check type="checkbox" label="Agree Term and conditions" />
                        </Form.Group>
                        <div className="v-parnet-signup-button">
                            <Button className="v-signup-button" type="submit" >
                                Submit
                            </Button>
                        </div>
                    </Form>
                        </div>
                    </div>
                </div>
                
            </div>
            </div>
        </>
    );
}
export default Signup;