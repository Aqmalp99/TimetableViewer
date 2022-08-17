// Components Imports
import NavbarTemp from "../Navbar/Navbar";
// Bootstrap imports
import Container from "react-bootstrap/Container";
import { Button} from "react-bootstrap";
import { Form } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const Signup = () =>{
    return(
        <>
            <div className="bg-container">
            <NavbarTemp/>
            <div className="login-container">
            <div className="login-box">
                <h1>Signup</h1>
                <br/>
                <Container>
                   <Form>
                        <Row>
                            <Col>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label sm="4">First Name</Form.Label>
                                        <Form.Control type="text" placeholder="Enter First name" />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Last Name</Form.Label>
                                    <Form.Control type="text" placeholder="Enter Last Name" />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" placeholder="Enter Email" />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Password" />
                            </Form.Group>
                        </Row>
                        <Form.Group className="mb-3" controlId="formBasicCheckbox">
                            <Form.Check type="checkbox" label="Agree Term and conditions" />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                </Container>
            </div>
        </div>
            </div>
        </>
    );
}
export default Signup;