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

  const classRef = useRef(null);

  const displayClashes = (clashes) => {
    console.log(clashes.length);
    if (clashes.length > 0){
      const clashMessages = clashes.map((element, index) => {
        return (
        <div key={index} className="clash-message">
            <h3>Clash</h3>
            <p>
              {
              (element.a.date > element.b.date) 
                ? element.a.date.slice(0, -14)
                : element.b.date.slice(0, -14)
              }
            </p>
            <p>Class 1: <span>{element.a.title}</span></p>
            <ul><li>{element.a.start.toLocaleTimeString()} - {element.a.end.toLocaleTimeString()}</li></ul>
            <p>Class 2: <span>{element.b.title}</span></p>
            <ul><li>{element.b.start.toLocaleTimeString()} - {element.b.end.toLocaleTimeString()}</li></ul>
        </div>
        );
      });
      

      setClashes(clashMessages);
    }
    else {
      console.log(clashes);
      setClashes([]);
      return (<></>);
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
  };
  
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
          <select>
            {availableClasses.map((element,index) =>{ 
                return <option key={index}>{element.classType}</option>
              }
            )}
          </select>
          <Button variant="primary" onClick={showAlternateClasses}>Accept</Button>
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
      <div className="clashes-container">
        {clashes}
      </div>
    </div>
  )
};

export default StudentTimetable;