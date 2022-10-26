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
    return(
        <>
        <div className="v-home">
        <div class="alert alert-warning alert-dismissible fade show" role="alert">
            <strong>Success</strong>: New user created
            {/* <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button> */}
        </div>
            <div className="v-signup-background">
            
                <div className="v-signup">
                    <div className='v-signup-header'>
                        <div className='v-signup-heading'> Uni Timetable</div>
                        <div className='v-signup-heading-float'> Login</div>
                    </div>
                    <div className="v-signup-form">
                        <div className="v-signup-form-heading"> SIGN UP</div>
                        <div className="v-signup-form-input">
                        <Form>
                        <Row>
                            <Col>
                                <Form.Group className="mb-3" controlId="username">
                                    <Form.Label sm="4">First Name</Form.Label>
                                        <Form.Control type="text"
                                            name="username"
                                            // value={test}
                                            // onChange={e => setTest(e.target.value)} 
                                            placeholder="First Name" 
                                        />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group className="mb-3" controlId="fullnameID">
                                    <Form.Label sm="4">Last Name</Form.Label>
                                    <Form.Control type="text"
                                        name="fullname" 
                                        placeholder="Last Name" 
                                    
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Form.Group className="mb-3" controlId="emailID">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email"
                                    placeholder="Email" 
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="PasswordID">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password"
                                    name="password"
                                    placeholder="Password" 
                                />
                            </Form.Group>
                            {/* <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Confirm Password</Form.Label>
                                <Form.Control type="password" placeholder="Confirm Password" />
                            </Form.Group> */}
                            {/* <Form.Group className="mb-3" controlId="roleID">
                                <Form.Label>Role</Form.Label>
                                <Form.Control type="text"
                                    name="role"
                                    value={role}
                                    onChange={onRoleChange} 
                                    placeholder="Enter Role" 
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="notificationID">
                                <Form.Label>Notification</Form.Label>
                                <Form.Control type="text"
                                    name="notification"
                                    value={notification}
                                    onChange={onNotificationChange} 
                                    placeholder="true/false" 
                                />
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
export default Signup;