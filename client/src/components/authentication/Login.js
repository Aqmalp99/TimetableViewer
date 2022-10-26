import axios from 'axios';
// State imports
import { useState} from "react";
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
import { Buffer } from 'buffer';

const Login = ({setToken})  => {
    const navigate= useNavigate();
    const [showTmc, setShowTmc]  = useState(false);
    const[alert, setAlert] = useState(null);

    const createAlert = (message, type)=> {
        setAlert({
            msg: message,
            type: type
        })
    }
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
              const base64Url = token.split('.')[1];
              const buff = Buffer.from(base64Url, 'base64');
              const payloadinit = buff.toString('ascii');
              const payload = JSON.parse(payloadinit);
              const role = payload.role;
              if( role === 'student')
                navigate("/student");
              
              else if ( role === 'teacher')
                navigate("/teacher")
              
              else if (role === 'admin')
                navigate("/admin");
              
                
        })
        
        .catch((err) => {
            createAlert("Username or password is incorrect", "ERROR")
            console.log(err)})
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
        <Alert_boot alert={alert}/>
        <div className="v-login-background">
            <div className='v-login'>
                <div className='v-login-float'>
                    <div className='v-login-header'>
                        <div className='v-heading'> Uni Timetable</div>
                        <div className='v-heading-float'> <Link to='/signup' className='link'> Sign Up</Link> </div>
                    </div>
                    <div className='v-login-form'>
                        <div className='v-login-form-heading'> SIGN IN</div>
                        <div className='v-login-form-heading-text'>Sign in to access the timetable</div>
                        <div className='v-login-form-input'>
                            <Form onSubmit={handleLogin}>
                                <Row>
                                    <Col>
                                        <div id="parent-username">
                                            <Form.Group className=" mb-3" id="username" controlId="formBasicEmail">
                                                <Form.Control type="Email" value={username} onChange={onUsernameChange} placeholder="Username" />
                                            </Form.Group>
                                        </div>
                                        <Form.Group className="mb-3" id="password" controlId="formBasicPassword">
                                            <Form.Control type="password" value={password} onChange={onPasswordChange} placeholder="Password" />
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
                                <Tmc showTmc={showTmc} setShowTmc={setShowTmc}/>
                                <div className='v-parnet-login-button'>
                                    <Button className='v-login-button' type="submit">
                                        Submit
                                    </Button>
                                </div>
                            </Form>

                        </div>
                    </div>
                </div>
                <div className='v-login-design'>
                    <div className='v-image-container'>
                        <img  className='v-design-images1' src={ellipse1}/>
                    </div>
                    <div className='v-image-container'>
                        <img  className='v-design-images2' src={ellipse2}/>
                    </div>
                    <div className='v-image-container'>
                        <img  className='v-design-images3' src={diagram1}/>
                    </div>
                    <div className='v-image-container'>
                        <div className='v-login-design-text'>Stay organized  <br/> in style </div>
                    </div>
                </div>

            </div>
        </div>
        </>
    );
}

export default Login;