import axios from 'axios';
// State imports
import "./login.css"

// Boot Strap imports
import { Button} from "react-bootstrap";
import { Form } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import Tmc from "./Tmc";
import  { useNavigate,Route, Link } from 'react-router-dom';
import ellipse1 from  "../assets/images/ellipse_big.svg"
import ellipse2 from  "../assets/images/ellipse_small.svg"
import diagram1 from  "../assets/images/undraw.svg"
import Alert_boot from '../Alert_boot';




const Login = ()  => {

    
    return(
        <>
        <div className="v-login-background">
        <div class="alert alert-warning alert-dismissible fade show" role="alert">
            <strong>ERROR</strong>: Please try Again
            {/* <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button> */}
        </div>
            <div className='v-login'>
                <div className='v-login-float'>
                    <div className='v-login-header'>
                        <div className='v-heading'> Uni Timetable</div>
                        <div className='v-heading-float'>  Sign Up </div>
                    </div>
                    <div className='v-login-form'>
                        <div className='v-login-form-heading'> SIGN IN</div>
                        <div className='v-login-form-heading-text'>Sign in to access the timetable</div>
                        <div className='v-login-form-input'>

                            <Form>
                                <Row>
                                    <Col>
                                        <div id="parent-username">
                                            <Form.Group className=" mb-3" id="username" controlId="formBasicEmail">
                                                <Form.Control type="Email"  placeholder="Username" />
                                            </Form.Group>
                                        </div>
                                        <Form.Group className="mb-3" id="password" controlId="formBasicPassword">
                                            <Form.Control type="password"  placeholder="Password" />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row xs="auto">
                                    <div className='v-login-forgot-box'>
                                        <div className='v-forgot-pass'>
                                            Forgot Password ?
                                        </div>
                                    </div>
                                </Row>
                                <Tmc/>
                                <div className='v-parnet-login-button'>
                                    <Button className='v-login-button' type="submit">
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

export default Login;