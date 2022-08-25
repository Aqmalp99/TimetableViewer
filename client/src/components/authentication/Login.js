
// State imports
import { useState} from "react";

// Boot Strap imports
import { Button} from "react-bootstrap";
import { Form } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import Container from "react-bootstrap/Container";

const Login = ()  => {
    // const [currentLogin, newLogin] = useState({
    //     email:'',
    //     password:''
    // });

    // const updateLogin = () => {
    //     // newLogin({email:Event.})
    // }
    return(
        <>
        <div className="login-container">
            <div className="login-box">
                <h1>Login</h1>
                <br/>
                <Container>
                   <Form>
                        <Row>
                            <Col>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Control type="email" placeholder="Enter email" />
                                </Form.Group>
                            
                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Control type="password" placeholder="Password" />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Form.Group className="mb-3" controlId="formBasicCheckbox">
                            <Form.Check type="checkbox" label="Agree" />
                        </Form.Group>
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