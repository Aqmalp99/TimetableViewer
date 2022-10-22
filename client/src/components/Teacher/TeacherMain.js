import React, { useCallback, useState } from "react";
import TeacherCalendar from "./TeacherCalendar";
import NavbarTeacher from "../Navbar/NavbarTeacher";
import ClassDetails from "./ClassDetails";
import Button from "react-bootstrap/Button";
import '../ShaeTest/styles.css';
import  { Navigate } from 'react-router-dom';
import { Buffer } from "buffer";
import io from "socket.io-client";

const socket = io("/", {
  // query: {
  //     id: id,
  // }
});

function getToken() {
  const tokenString = sessionStorage.getItem('token');
  const userToken = JSON.parse(tokenString);
  console.log(userToken);
  return userToken;
}

const TeacherMain = () => {
  
  const [showClassDetails, setShowClassDetails] = useState(false);
  const [clashes, setClashes] = useState([]);
  const [selectedClass, setSelectedClass]= useState([]);

  const displayClashes = (clashes) => {
    if (clashes.length > 0){
      const clashMessages = clashes.map((element, index) => {
        return (
        <div key={index} className="clash-message">
            <h3>Clash</h3>
            <p>
              {
              (element.a.start_date > element.b.start_date) 
                ? element.a.start_date.slice(0, -14)
                : element.b.start_date.slice(0, -14)
              }
            </p>
            <p>Class 1: <span>{element.a.class_code}</span></p>
            <ul><li>{element.a.start_time} - {element.a.end_time}</li></ul>
            <p>Class 2: <span>{element.b.class_code}</span></p>
            <ul><li>{element.b.start_time} - {element.b.end_time}</li></ul>
            <Button>Resolve Clash</Button>
        </div>
        );
      });

      setClashes(clashMessages);
    }
  }

  const ChangeSelectedClass = useCallback((event) => {
    setSelectedClass(event);
  },[]);

  const onClassClick = ()=> {
    setShowClassDetails(!showClassDetails);
  };
  
  const token = getToken();
  if(!token)
  {
    console.log(getToken());
    return <Navigate to='/'/>;

  }

  const sendMessage = () => {
    // let messageData = {
    //     sender: id,
    //     message: message,
    //     convoID: conversations[activeConversation].match_id,
    // }

    // setMessages((messages) => ([...messages, messageData]));

    // socket.emit("send_message", {messageData});
    // setMessage("");
}

  const base64Url = token.split('.')[1];
  const buff = Buffer.from(base64Url, 'base64');
  const payloadinit = buff.toString('ascii');
  const payload = JSON.parse(payloadinit);
  const id=payload.id;
  const role = payload.role;

  return (
    <div className="App">
        {console.log(id)}
      <NavbarTeacher/>
      <TeacherCalendar id={id} role={role} onClassClick= {onClassClick}displayClashes={displayClashes} ChangeSelectedClass={ChangeSelectedClass}/>
      <ClassDetails showClassDetails={showClassDetails} onClassClick={onClassClick} selectedClass={selectedClass} />
      <div className="clashes-container">
        {clashes}
      </div>
    </div>
  )
};

export default TeacherMain;