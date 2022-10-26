import React, {useEffect, useState} from 'react';
import NavbarAdmin from '../Navbar/NavbarAdmin';
import "./style.css";
import io from "socket.io-client";
import axios from 'axios';
import ListGroup from 'react-bootstrap/ListGroup';
import moment from 'moment-timezone';
import { Button } from 'react-bootstrap';
import { useNavigate, Navigate } from 'react-router-dom';
import { Buffer } from 'buffer';

const socket = io("/", {
  query: {
      role: "admin",
  }
});

function getToken() {
    const tokenString = sessionStorage.getItem('token');
    const userToken = JSON.parse(tokenString);
    console.log(userToken);
    return userToken;
  }  

const AdminInbox = () => {
    const navigate = useNavigate();
    const [clashes, setClashes] = useState([]);
    // const [selectedMessage, setSelectedMessage] = useState(0);

    useEffect(() => {
        const fetchClashes = async () => {
            await axios
            .get(`/admin/clashes`)
            .then((res) => {
                console.log(res)
                setClashes(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
        }

        fetchClashes();
    }, []);

    useEffect(() => {
        socket.on("receive_message", (data) => {
            
            // const newData = [...clashes];
            const newInput = {uni_id: data.student_id, date_time: moment().format()}
            // newData.push(newInput);
            // console.log(newData);
            setClashes( (oldArray) => [...oldArray, newInput]);
        })
    }, [socket]);
    
    const onClick= (e) => {
        console.log(e.target.value);
        navigate('/admin' , {state: { student_id: e.target.value}})
    }
    const renderedClashes = clashes.map((element,index) => {
        return (<ListGroup.Item key = {index}>{element.uni_id} <Button value={element.uni_id} onClick={onClick}> Review Timetable</Button></ListGroup.Item>)
    })

    const token = getToken();
    if(!token)
    {
        console.log(getToken());
        return <Navigate to='/'/>;

    }
    const base64Url = token.split('.')[1];
    const buff = Buffer.from(base64Url, 'base64');
    const payloadinit = buff.toString('ascii');
    const payload = JSON.parse(payloadinit);
    const roleLogin = payload.role;
    if( roleLogin === 'student')
        navigate("/student");
                
    else if ( roleLogin === 'teacher')
        navigate("/teacher")
    else if (roleLogin !== 'admin')
        navigate("/")
    return (<>
        <NavbarAdmin />
        <h1>Admin Inbox!</h1>
        <div className='inbox-wrapper'>
                <div className='inbox-list'>
                    <ListGroup variant="flush">
                        {renderedClashes}
                    </ListGroup>
                </div>
        </div>
    </>)
}

export default AdminInbox;