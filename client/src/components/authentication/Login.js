import axios from 'axios';
// State imports
import { useState} from "react";
import "./login.css"

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
        <div className='v-login'>
            <div className='v-login-float'>
                <div className='v-login-header'>
                    <div className='v-heading'> Uni Timetable</div>
                    <div className='v-heading-float'> Uni Timetable</div>

                </div>
            </div>
            <div className='login-design'></div>

        </div>
        
        </>
    );
}

export default Login;