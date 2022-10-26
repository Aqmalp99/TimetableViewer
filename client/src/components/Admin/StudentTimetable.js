import React, { useCallback, useState, useRef } from "react";
import LoadTimetable from "./LoadTimetable";
import Button from "react-bootstrap/Button";
import '../ShaeTest/styles.css';
import Modal from 'react-bootstrap/Modal';
import { ModalBody } from "react-bootstrap";
import  { Navigate } from 'react-router-dom';
import { Buffer } from "buffer";
import axios from "axios";
import moment from "moment-timezone";
import io from "socket.io-client";

const socket = io("/", {
  query: {
      role: "admin",
  }
});

// function getToken() {
//   const tokenString = sessionStorage.getItem('token');
//   const userToken = JSON.parse(tokenString);
//   console.log(userToken);
//   return userToken;
// }

const StudentTimetable = ({role,userID}) => {
  
  const [showClassDetails, setShowClassDetails] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [clashes, setClashes] = useState([]);
  const [showClasses, setShowClasses] = useState(false);
  const [showDeEnrol, setShowDeEnrol] = useState(false);
  const [selectedClass, setSelectedClass]= useState([]);
  const [availableClasses, setAvailableClasses]= useState([]);
  const [editMode, setEditMode]= useState(false);
  const [showChangeClass, setShowChangeClass]= useState(false);
  const [formData, setFormData] = useState({});
  const [showApproveConfirm, setShowApproveConfirm] = useState(false);

  const classRef = useRef(null);

  const displayClashes = (clashes) => {
    if (clashes.length > 0){
      const clashMessages = clashes.map((element, index) => {
        return (
        <div key={index} style={{ backgroundColor: (element.a.clash_resolved === "approved") ? "rgb(0,204,0)" : "rgb(255,0,0)" }} className="clash-message">
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
        </div>
        );
      });

      setClashes(clashMessages);
    }
  }

  const ifEventSelected = selected => {
    setButtonDisabled(selected ? false : true);
  }

  

  const ChangeSelectedClass = useCallback((event) => {
    setSelectedClass(event);
  },[]);

  const onClassClick = ()=> {
    setShowClassDetails(!showClassDetails);
  }
  
  const toggleEditOptions = () => {
    setEditMode(!editMode);
  }

  const toggleAlternateClasses = async(e) => {
    
    await axios
    .get("/admin/alternate-classes", { params: { class_code: selectedClass.title, class_type: selectedClass.classType, class_id: selectedClass.id } } )
    .then((response) => {
      let data = response.data.map(element => {
        return {
          id: element.class_id,
          title: element.class_code,
          className: element.class_name,
          classType: element.class_type,
          classSize: element.class_size,
          color: "#56ca70",
          date: moment(element.start_date).format('YYYY-MM-DD'),
          start: new Date(moment(element.start_date).format('YYYY-MM-DD') + "T" + element.start_time),
          end: new Date(moment(element.start_date).format('YYYY-MM-DD') +"T" + element.end_time),
          venue: element.room_code + " / " + element.building,
          recurring: {
            repeat: 'weekly',
            interval: 1
          }
        };
      })
      setAvailableClasses(data);
    })
      
    .catch((err) => console.log(err))

    setShowClasses(!showClasses);
  }
  const showAlternateClasses = () => {
    setShowClasses(!showClasses);
  }

  const toggleDeEnrol = () => {
    setShowDeEnrol(!showDeEnrol);
  }

  const deEnrolClass= async(e) => {
    const body = {user_id: userID, class_id: selectedClass.id}
    await axios
    .post("/admin/de-enrol",body)
    .then((response) => {
        
    })
      
    .catch((err) => console.log(err))
    classRef.current.deEnrol({id: selectedClass.id});
    setShowDeEnrol(!showDeEnrol);
  }


  const toggleApproveConfirm = () => {
    setShowApproveConfirm(!showApproveConfirm);
  }

  const onApproveTimetable = async () => {
    socket.emit("send_message_admin", {id: userID});
    toggleApproveConfirm();
  }


  const confirmAlternateClass = async() => {

    let body = {user_id: userID, class_id: selectedClass.id, newClass_id: formData.newClass_id}
    await axios
    .post("/admin/change-class",body)
    .then((response) => {
        
    })
    let data= availableClasses.map(element => {
      if(element.id ===  parseInt(formData.newClass_id))
      {
        body={...body, date: element.date, start: element.start, end: element.end};
      }
    })
    classRef.current.alternateClass(body);
    setShowClasses(!showClasses);

  }

  const chooseClass = (e) => {
    console.log(e.target.value);
    setFormData({...formData, newClass_id: e.target.value });

  }
//   const token = getToken();
//   if(!token)
//   {
//     console.log(getToken());
//     return <Navigate to='/'/>;

//   }
//   const base64Url = token.split('.')[1];
//   const buff = Buffer.from(base64Url, 'base64');
//   const payloadinit = buff.toString('ascii');
//   const payload = JSON.parse(payloadinit);
//   const id=payload.id;
//   const role = payload.role;

  return (
    <div className="App">
      <Button variant={editMode ? "outline-danger" : "outline-primary"} onClick={toggleEditOptions}>
          {editMode ? 
            <>Close Edit</> : <>Edit</>
          }
        </Button>
      {(clashes.length > 0) ? <Button variant="outline-success" onClick={toggleApproveConfirm}>Approve Timetable</Button> : <></>}
      <LoadTimetable ref={classRef} id={userID} role={role} onClassClick= {onClassClick}displayClashes={displayClashes} ifEventSelected={ifEventSelected} ChangeSelectedClass={ChangeSelectedClass}/>
      <div className="button-group-flex">
      { editMode ? 
        (<><Button className="me-3 mt-3" disabled={buttonDisabled} onClick={toggleDeEnrol}>
          De-Enrol
        </Button>
        <Button className="me-3 mt-3" disabled={buttonDisabled} onClick={toggleAlternateClasses}>
          Get Alternate Classes
        </Button></>) : <></>
      }
      </div>
      <Modal show={showClassDetails} onHide={onClassClick}>
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
      </Modal>
      <Modal show={showClasses} onHide={showAlternateClasses}>
      <Modal.Header closeButton>
          <Modal.Title>Alternate Classes</Modal.Title>
       </Modal.Header>
       <ModalBody>
        <label htmlFor="venues">Choose an Available Class:</label>
          <select onClick={chooseClass}>
            {availableClasses.map((element,index) =>{ 
                return <option key={index} value={element.id}>{element.classType} {element.date} {element.start.toLocaleTimeString()} {element.end.toLocaleTimeString()}</option>
              }
            )}
          </select>
          <Button variant="primary" onClick={confirmAlternateClass}>Accept</Button>
       </ModalBody>
      </Modal>
      <Modal show={showDeEnrol} onHide={toggleDeEnrol}>
      <Modal.Header closeButton>
          <Modal.Title>Are you sure?</Modal.Title>
       </Modal.Header>
       <ModalBody>
       <div className="d-grid gap-2">
          <Button size='lg' variant="danger" onClick={toggleDeEnrol}>No</Button>
          <Button size='lg' variant="success" onClick={deEnrolClass}>Yes</Button>
          </div>
       </ModalBody>
      </Modal>
      <Modal show={showApproveConfirm} onHide={toggleApproveConfirm}>
      <Modal.Header closeButton>
          <Modal.Title>Are you sure?</Modal.Title>
       </Modal.Header>
       <ModalBody>
       <div className="d-grid gap-2">
          <Button size='lg' variant="danger" onClick={toggleApproveConfirm}>No</Button>
          <Button size='lg' variant="success" onClick={onApproveTimetable}>Yes</Button>
          </div>
       </ModalBody>
      </Modal>
      <div className="clashes-container">
        {clashes}
      </div>
    </div>
  )
};

export default StudentTimetable;