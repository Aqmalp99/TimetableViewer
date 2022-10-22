import React, { useCallback, useState } from "react";
import StudentCalendar from "./StudentCalendar";
import ClassDetails from "./ClassDetails";
import Button from "react-bootstrap/Button";
import '../ShaeTest/styles.css';
import Modal from 'react-bootstrap/Modal';
import { ModalBody } from "react-bootstrap";
import  { Navigate } from 'react-router-dom';
import { Buffer } from "buffer";
import axios from "axios";
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

const StudentMain = () => {
  
  const [showClassDetails, setShowClassDetails] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [clashes, setClashes] = useState([]);
  const [showVenues, setShowVenues] = useState(false);
  const [selectedClass, setSelectedClass]= useState([]);
  const [availableVenues, setAvailableVenues]= useState([]);

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

  const ifEventSelected = selected => {
    setButtonDisabled(selected ? false : true);
  }

  const showAlternateVenues = () => {
    const date= selectedClass.date;
    const startTime= selectedClass.start.toLocaleTimeString('en-US',{ hour12: false });
    const endTime= selectedClass.end.toLocaleTimeString('en-US',{ hour12: false });

    const getVenues = async () => {
      await axios
        .get(`/staff/venues`, { params: {date:date , start_time: startTime, end_time: endTime}})
        .then((response)=> {
          let data = response.data.map(element => {
            return {
              venueID: element.venue_id,
              venue: element.room_code + " / " + element.building,
              capacity: element.capacity
            };
          })
          setAvailableVenues(data);
        })
        .catch((err) => console.log(err))
      }
    setShowVenues(!showVenues);
    getVenues();
  };

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
      
      <p>My app</p>
      <StudentCalendar id={id} role={role} onClassClick= {onClassClick}displayClashes={displayClashes} ifEventSelected={ifEventSelected} ChangeSelectedClass={ChangeSelectedClass}/>
      <div className="button-group-flex">
        <Button className="me-3 mt-3" disabled={buttonDisabled}>
          Get Recommended Times
        </Button>
        <Button className="me-3 mt-3" disabled={buttonDisabled} onClick={showAlternateVenues}>
          Get Alternate Venues
        </Button>
      </div>
      <ClassDetails showClassDetails={showClassDetails} onClassClick={onClassClick} selectedClass={selectedClass} />
      {/* <Modal show={showClassDetails} onHide={onClassClick}>
      <Modal.Header closeButton>
          <Modal.Title>Class Details</Modal.Title>
       </Modal.Header>
       <ModalBody>
          <p>Title: {selectedClass.title}</p>
          <p>Name: {selectedClass.className}</p>
          <p>Venue: {selectedClass.venue}</p>
          <p>class Size: {selectedClass.classSize}</p>
          <p>Class Time: 
            {(selectedClass.start ===undefined) ? "" : selectedClass.start.toLocaleTimeString()} 
            -
            {(selectedClass.end === undefined) ? "" : selectedClass.end.toLocaleTimeString()}
           </p>
          <p>Type of Class: {selectedClass.classType}</p>
       </ModalBody>
      </Modal> */}
      <Modal show={showVenues} onHide={showAlternateVenues}>
      <Modal.Header closeButton>
          <Modal.Title>Alternate Venues</Modal.Title>
       </Modal.Header>
       <ModalBody>
        <label htmlFor="venues">Choose an Available Venue:</label>
          <select>
            {availableVenues.map((element,index) =>{ 
                return <option key={index}>{element.venue}</option>
              }
            )}
          </select>
          <Button variant="primary" onClick={showAlternateVenues}>Accept</Button>
       </ModalBody>
      </Modal>
      <div className="clashes-container">
        {clashes}
      </div>
    </div>
  )
};

export default StudentMain;