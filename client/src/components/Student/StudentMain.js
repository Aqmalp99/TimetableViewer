import React, { useCallback, useState } from "react";
import StudentCalendar from "./StudentCalendar";
import NavbarStudent from "../Navbar/NavbarStudent";
import ClassDetails from "./ClassDetails";
import Button from "react-bootstrap/Button";
import './styles.css';
import  { Navigate, useNavigate } from 'react-router-dom';
import { Buffer } from "buffer";

function getToken() {
  const tokenString = sessionStorage.getItem('token');
  const userToken = JSON.parse(tokenString);
  console.log(userToken);
  return userToken;
}

const StudentMain = () => {
  const navigate= useNavigate();
  const [showClassDetails, setShowClassDetails] = useState(false);
  const [clashes, setClashes] = useState([]);
  const [selectedClass, setSelectedClass]= useState([]);

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
    <div className="App">
      <NavbarStudent/>
      <StudentCalendar id={id} role={role} onClassClick= {onClassClick}displayClashes={displayClashes} ChangeSelectedClass={ChangeSelectedClass}/>
      <ClassDetails showClassDetails={showClassDetails} onClassClick={onClassClick} selectedClass={selectedClass} />
      <div className="clashes-container">
        {clashes}
      </div>
    </div>
  )
};

export default StudentMain;