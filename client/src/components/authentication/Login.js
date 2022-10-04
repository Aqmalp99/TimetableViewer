import axios from 'axios';
// State imports
import { useState} from "react";

// Boot Strap imports
import { Button} from "react-bootstrap";
import { Form } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import cookie from "js-cookies";

import Container from "react-bootstrap/Container";
import { Prev } from "react-bootstrap/esm/PageItem";
import Tmc from "./Tmc";
import  { useNavigate,Route } from 'react-router-dom';
import AqmalTest from "../AqmalTest/AqmalTest";

const Login = ({setToken})  => {
    const navigate= useNavigate();
    const [showTmc, setShowTmc]  = useState(false);

    const openTmc = () => {
        setShowTmc(prev => !prev);
    }

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    

    const onUsernameChange = e => setUsername(e.target.value);
    const onPasswordChange = e => setPassword(e.target.value);

    const handleLogin = async(e) => {
        e.preventDefault();
        const body = {username,password};
        await axios
        .post("/",body)
        .then((response) => {
            const token=response.data.accessToken;
            setToken(token);
            navigate("/aqmal");
        })
        
        .catch((err) => console.log(err))
            // const body = {username,password};
            // const loginDetails = await fetch("/", {
            //     method: "POST",
            //     headers: { "Content-Type": "application/json"},
            //     // credentials: "include",
            //     body: JSON.stringify(body)
            // });

        // }catch(err) {
        //     console.error(username);
        // }
    }

    return(
        <>
        <div className="login-container">
            <div className="login-box">
                <h1>Login</h1>
                <br/>
                <Container>
                   <Form onSubmit={handleLogin}>
                        <Row>
                            <Col>
                                <Form.Group className="mb-3" id="username" controlId="formBasicEmail">
                                    <Form.Control type="Text" value={username} onChange={onUsernameChange} placeholder="Enter Username" />
                                </Form.Group>
                            
                                <Form.Group className="mb-3" id="password" controlId="formBasicPassword">
                                    <Form.Control type="password" value={password} onChange={onPasswordChange} placeholder="Password" />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row xs="auto">
                            <Col>
                                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                                    <Form.Check type="checkbox" />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group className="mb-3">
                                    <a href="#"><Form.Label onClick={openTmc}>Agree Terms and Conditions</Form.Label></a>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Tmc showTmc={showTmc} setShowTmc={setShowTmc}/>
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                </Container>
            </div>
        </div>
        </>
    );
}

export default Login;