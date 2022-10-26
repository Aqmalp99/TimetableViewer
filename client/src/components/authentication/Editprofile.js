import { useState, Fragment } from "react";
import jwt_decode from "jwt-decode";
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

function getToken() {
  const tokenString = sessionStorage.getItem('token');
  const userToken = JSON.parse(tokenString);
  console.log(userToken);
  return userToken;
}

const Editprofile = () =>{
    const navigate= useNavigate();
    const token = getToken();
      if(!token)
      {
        console.log(getToken());
      }
    const decoded = jwt_decode(token);
    const[alert, setAlert] = useState(null);

    const createAlert = (message, type)=> {
        setAlert({
            msg: message,
            type: type
        })
    }

    const [username, setUsername] = useState("");
    const [fullname, setFullname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("");
    const [notification, setNotification] = useState("");

    const onUsernameChange = e => setUsername(e.target.value);
    const onFullnameChange = e => setFullname(e.target.value);
    const onEmailChange = e => setEmail(e.target.value);
    const onPasswordChange = e => setPassword(e.target.value);
    const onRoleChange = e => setRole(e.target.value);
    const onNotificationChange = e => setNotification(e.target.value);


    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            const body = {username, fullname, email, password,role,notification};

            if (body.email !== decoded.username)
            {
                createAlert("Please enter your email", "ERROR");
                console.log(decoded);
            }
            else if (body.password.length === 0)
            {
                createAlert("Please enter new password", "ERROR");
            }
            else
            {
            const editUserRequest = await fetch("http://localhost:4000/editUser", {
                method: "POST",
                headers: { "Content-Type": "application/json"},
                body: JSON.stringify(body)
            });
            console.log(editUserRequest);
            createAlert("Settings has been changed", "Success")
        }

        }catch(err) {
            createAlert("Cannot Edit try Again", "ERROR")
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
                        {/* <div className='v-signup-heading-float'> <Link to='/' className='link'> Login</Link> </div> */}
                    </div>
                    <div className="v-signup-form">
                        <div className="v-signup-form-heading"> EDIT PROFILE</div>
                        <div className="v-signup-form-input">
                        <Form onSubmit={handleSubmit}>
                        <Row>
                            <Form.Group className="mb-3" controlId="emailID">
                                <Form.Label>Enter Your Email</Form.Label>
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
export default Editprofile;