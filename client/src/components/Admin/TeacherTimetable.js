import React, { useCallback, useState, useRef } from "react";
import LoadTimetable from "./LoadTimetable";
import Button from "react-bootstrap/Button";
import '../ShaeTest/styles.css';
import Modal from 'react-bootstrap/Modal';
import { ModalBody } from "react-bootstrap";
import  { Navigate } from 'react-router-dom';
import axios from "axios";
import Form from 'react-bootstrap/Form';
import io from "socket.io-client";

// const socket = io("/", {
//   query: {
//       role: "admin",
//   }
// });
// function getToken() {
//   const tokenString = sessionStorage.getItem('token');
//   const userToken = JSON.parse(tokenString);
//   console.log(userToken);
//   return userToken;
// }

const TeacherTimetable = ({role,userID}) => {
  
  const [showClassDetails, setShowClassDetails] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [clashes, setClashes] = useState([]);
  const [showVenues, setShowVenues] = useState(false);
  const [showExtraClasses, setShowExtraClasses] = useState(false);
  const [selectedClass, setSelectedClass]= useState([]);
  const [availableVenues, setAvailableVenues]= useState([]);
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

  const showAlternateVenues = () => {
    const date= selectedClass.date;
    const startTime= selectedClass.start.toLocaleTimeString('en-US',{ hour12: false });
    const endTime= selectedClass.end.toLocaleTimeString('en-US',{ hour12: false });

    const getVenues = async () => {
      await axios
        .get(`/teacher/venues`, { params: {date:date , start_time: startTime, end_time: endTime}})
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
  
  const toggleEditOptions = () => {
    setEditMode(!editMode);
  }

  const currentClassTime = (e) => {
    setFormData(
        {date: selectedClass.date, 
        start: selectedClass.start.toLocaleTimeString('en-US',{ hour12: false }),
        end: selectedClass.end.toLocaleTimeString('en-US',{ hour12: false }),
        class_name: selectedClass.className,
        class_type: selectedClass.classType,
        class_code: selectedClass.title,
        staff_id: userID});
    if(e.target.value === "currentClass")
      setShowChangeClass(!showChangeClass);
    else if (e.target.value === "extraClass")
      setShowExtraClasses(!showExtraClasses);
  }

  const onDateTimeChanged = (e) => {
    setFormData(
      {date: (e.target.id === "date") ? e.target.value : formData.date, 
      start: (e.target.id === "start") ? e.target.value : formData.start,
      end: (e.target.id === "end") ? e.target.value : formData.end
      })
  }

  const updateClassTime = async(e) => {
    e.preventDefault();
   
    const body = {id: selectedClass.id, date: formData.date, start: formData.start, end: formData.end};
    await axios
      .post("/admin/update-time",body)
      .then((response) => {
          
      })
        
      .catch((err) => console.log(err))
    
    classRef.current.updateClass({id: selectedClass.id, date: formData.date, start: formData.start, end: formData.end});
    setShowChangeClass(!showChangeClass);
  }

  const extraClass = async(e) => {
    e.preventDefault();
    const date= selectedClass.date;
    const startTime= selectedClass.start.toLocaleTimeString('en-US',{ hour12: false });
    const endTime= selectedClass.end.toLocaleTimeString('en-US',{ hour12: false });
    const getVenues = async () => {
      await axios
        .get(`/teacher/venues`, { params: {date:date , start_time: startTime, end_time: endTime}})
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
    
    getVenues();
  
    
    // classRef.current.updateClass({id: selectedClass.id, date: formData.date, start: formData.start, end: formData.end});
    
  }

  const closeModal = () => {
    setShowChangeClass(!showChangeClass);
  }
  const closeExtraClassModal = () => {
    setAvailableVenues([]);
    setShowExtraClasses(!showExtraClasses);
  }

  const chooseVenue = (e) => {
    setFormData({...formData, venue_id: e.target.value });
  }
  
  const submitNewClass = async () => {
    let body = {...formData};
    console.log(body);
       const { data }= await axios.post(`/admin/create-class`, body)
       body={...body, class_id:data[0].class_id};
       
      setAvailableVenues([]);
      setShowExtraClasses(!showExtraClasses);
      classRef.current.newClass(body);
      
  }

  const confirmNewVenue = async () => {
    let body = {class_id: selectedClass.id, venue_id: formData.venue_id}
    await axios
    .post("/admin/update-venue",body)
      .then((response) => {
          
      })
        
      .catch((err) => console.log(err))
      setShowVenues(!showVenues);
  }

  const toggleApproveConfirm = () => {
    setShowApproveConfirm(!showApproveConfirm);
  }

  const onApproveTimetable = async () => {
    // socket.emit("send_message_admin", {id: userID});
    toggleApproveConfirm();
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
      
      <LoadTimetable ref= {classRef} id={userID} role={role} onClassClick= {onClassClick}displayClashes={displayClashes} ifEventSelected={ifEventSelected} ChangeSelectedClass={ChangeSelectedClass}/>
      <div className="button-group-flex">
      { editMode ? 
        (<><Button className="me-3 mt-3" disabled={buttonDisabled} value= "currentClass" onClick={currentClassTime}>
          Change Class Times
        </Button>
        <Button className="me-3 mt-3" disabled={buttonDisabled} onClick={showAlternateVenues}>
          Get Alternate Venues
        </Button>
        <Button className="me-3 mt-3" disabled={buttonDisabled} value="extraClass" onClick={currentClassTime}>
          Add Extra Class
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

      <Modal show={showVenues} onHide={showAlternateVenues}>
      <Modal.Header closeButton>
          <Modal.Title>Alternate Venues</Modal.Title>
       </Modal.Header>
       <ModalBody>
        <label htmlFor="venues">Choose an Available Venue:</label>
          <select onClick={chooseVenue}>
            {availableVenues.map((element,index) =>{ 
                return <option key={index} value={element.venueID}>{element.venue}</option>
              }
            )}
          </select>
          <Button variant="primary" onClick={confirmNewVenue}>Accept</Button>
       </ModalBody>
      </Modal>

      <Modal show={showChangeClass} onHide={closeModal}>
      <Modal.Header closeButton>
          <Modal.Title>Change Class Times</Modal.Title>
       </Modal.Header>
       <ModalBody>
          <Form onSubmit={updateClassTime}>
            <Form.Group className="mb-3">
              <Form.Label> Date of First Class</Form.Label>
              <Form.Control type="date" id="date" value={formData.date} onChange={onDateTimeChanged}/>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label> Start Time </Form.Label>
              <Form.Control type="time" id="start"value={formData.start} onChange={onDateTimeChanged}/>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label> End Time </Form.Label>
              <Form.Control type="time" id="end" value={formData.end} onChange={onDateTimeChanged}/>
            </Form.Group>
            
            <Button variant="primary" type="submit">Accept</Button>
          </Form>
          
       </ModalBody>
      </Modal>

      <Modal show={showExtraClasses} onHide={closeExtraClassModal}>
      <Modal.Header closeButton>
          <Modal.Title>New Class Times</Modal.Title>
       </Modal.Header>
       <ModalBody>
          <Form onSubmit={extraClass}>
            <Form.Group className="mb-3">
              <Form.Label> Date of First Class</Form.Label>
              <Form.Control type="date" id="date" value={formData.date} onChange={onDateTimeChanged}/>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label> Start Time </Form.Label>
              <Form.Control type="time" id="start"value={formData.start} onChange={onDateTimeChanged}/>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label> End Time </Form.Label>
              <Form.Control type="time" id="end" value={formData.end} onChange={onDateTimeChanged}/>
            </Form.Group>
            
            
          <div className="d-grid gap-2">
            <Button size="lg" variant="outline-primary" type="submit">Show Available Venues</Button>
          </div>
          <div className="d-grid gap-2">
          <label htmlFor="venues">Choose an Available Venue:</label>
            <select onClick={chooseVenue}>
                {availableVenues.map((element,index) =>{ 
                    return <option key={index} value={element.venueID}>{element.venue}</option>
                }
                )}
            </select>
            </div><br/>
            <div className="d-grid gap-2">
              <Button size= 'lg' variant="primary" onClick={submitNewClass}>Accept</Button>
            </div>
            </Form>
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

export default TeacherTimetable;