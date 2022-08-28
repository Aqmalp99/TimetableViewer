
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
                                    <Form.Control type="Text" placeholder="Enter Username" />
                                </Form.Group>
                            
                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Control type="password" placeholder="Password" />
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