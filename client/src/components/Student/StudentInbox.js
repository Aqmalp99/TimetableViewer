import React, { useEffect, useState } from 'react'
import NavbarStudent from '../Navbar/NavbarStudent';
import io from "socket.io-client";
import { Buffer } from 'buffer';
import { Button, ListGroup } from 'react-bootstrap';
import  { Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';

function getToken() {
    const tokenString = sessionStorage.getItem('token');
    const userToken = JSON.parse(tokenString);
    console.log(userToken);
    return userToken;
}
function getRole() {
    const token = getToken();
    if (token != null){
        const base64Url = token.split('.')[1];
        const buff = Buffer.from(base64Url, 'base64');
        const payloadinit = buff.toString('ascii');
        const payload = JSON.parse(payloadinit);
        const role=payload.role;
        return role;
    }
    return "noRole";
}

function getID() {
    const token = getToken();
    if (token != null){
        const base64Url = token.split('.')[1];
        const buff = Buffer.from(base64Url, 'base64');
        const payloadinit = buff.toString('ascii');
        const payload = JSON.parse(payloadinit);
        const id=payload.id;
        return id;
    }
    return null;
}

const socket = io("/", {
    query: {
        id: getID(),
        role: getRole(),
    }
});

const StudentInbox = () => {

    const [notifications, setNotifications] = useState([]);

    const onDismiss = async (e) => {
        console.log(e.target.value);
        const body = { id: e.target.value };
        await axios.post('/notification/delete', body);

        const newData = notifications.filter((element) => {
            return element.notification_id != e.target.value;
        });

        console.log("hi");
        setNotifications(newData);
    }

    useEffect(() => {
        axios.get('/notifications', { params: { id: getID() } })
             .then((response) => setNotifications(response.data))
             .catch((err) => console.log(err));
    }, []);

    useEffect(() => {
        socket.on('receive_message', (data) => {
            console.log(data);
            setNotifications(notifications => [notifications, {notification_id: data.notification_id, type: data.type}]);
        })
    }, [socket]);

    const renderedNotifications = notifications.map((element, index) => {
        if (element.type === 'approval'){
            return <ListGroup.Item key={index}>Your timetable with clashes has been approved by an administrator! <Button value={element.notification_id} onClick={onDismiss}> Dismiss</Button></ListGroup.Item>
        }
    });
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
  const id=payload.id;
  const role = payload.role;
  if( role === 'admin')
    return <Navigate to='/admin'/>;
  else if ( role === 'teacher')
    return <Navigate to='/teacher'/>;
  else if (role !== 'student')
    return <Navigate to='/'/>;

    return (
    <div>
        <NavbarStudent />
        <div className='inbox-wrapper'>
            <div className='inbox-list'>
                <ListGroup variant="flush">
                    {renderedNotifications}
                </ListGroup>
            </div>
        </div>
    </div>
  )
}

export default StudentInbox