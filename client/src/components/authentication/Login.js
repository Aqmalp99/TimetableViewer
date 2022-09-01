
// State imports
import { useState} from "react";

// Boot Strap imports
import { Button} from "react-bootstrap";
import { Form } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import Container from "react-bootstrap/Container";
import { Prev } from "react-bootstrap/esm/PageItem";
import Tmc from "./Tmc";

const Login = ()  => {
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
        try {
            const body = {username,password};
            const loginDetails = await fetch("http://localhost:8080/", {
                method: "POST",
                headers: { "Content-Type": "application/json"},
                body: JSON.stringify(body)
            });

        }catch(err) {
            console.error(err.message);
        }
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