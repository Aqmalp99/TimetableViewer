import React, { useState, useMemo, useEffect, useCallback } from "react";
import "@mobiscroll/react/dist/css/mobiscroll.min.css";
import { Eventcalendar, getJson, toast } from "@mobiscroll/react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { ModalBody } from "react-bootstrap";
import axios from "axios";


const Timetable = () => {
  const [myEvents, setEvents] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  const [show, setShow] = useState(false);

   //events object has color, end, id, start, title
   useEffect(() => {
    const getClasses = async () => {
      await axios
      .get("/student/2")
      .then((response) => {
        let data = response.data.map(element => {
          return {
            title: element.class_code,
            className: element.class_name,
            classType: element.class_type,
            color: "#56ca70",
            start: new Date(element.start_date.slice(0,10) + "T" + element.start_time),
            end: new Date(element.start_date.slice(0,10) +"T" + element.end_time),
            venue: element.room_code + " / " + element.building,
            recurring: {
              repeat: 'weekly',
              interval: 1
            }
          };
        })
        setEvents(data);
        console.log(data);
        if (response.data.length === 0)
          setError("No classes");
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        setError(500);
      });
    }

    getClasses();
  }, []);

  const toggleShow = () => {
    setShow(!show)
  };

  const [classDetails, setClassDetails]=useState(
    {
      title:"",
      venue:"",
      className:"",
      classType:"",
      start:"",
      end:""
    }
  );
  
  const onEventClick = React.useCallback((event) => {
    setShow(!show);
    setClassDetails(event.event);
    console.log(classDetails);

  }, [classDetails,show]);

  //make start time and end time dynamic based on the classes for that day
  const view = useMemo(() => {
    return {
      schedule: {
        type: "week",
        startTime: "08:00",
        endTime: "18:00",
        allDay: false,
        startDay: 1,
        endDay: 5
      },
    };
  }, []);

  const renderScheduleEventContent = React.useCallback((data) => {
    return (
      <div>
        <div>
           <div>{data.original.title}</div>
           <div>{data.original.className}</div>
           <div>{data.original.venue}</div>
           <div>{data.original.classType}</div>
          </div>
      </div>
    );
    });

    if (loading){
      return <div>Loading...</div>;
    }
  
    if (error){
      if (error === 500){
        return <div>There has been an error fetching your class details. Please refresh your page and try again</div>
      }
      
      if (error === "No classes"){
        return <div>We have no record of your enrolment in any classes. Please contact a course administrator.</div>
      }
    }
  return (
    <div className="calendar-container">
      
      <Eventcalendar
        className="calendar-width"
        theme="ios"
        themeVariant="light"
        clickToCreate={false}
        dragToCreate={false}
        dragToMove={false}
        dragToResize={false}
        eventDelete={false}
        data={myEvents}
        view={view}
        onEventClick={onEventClick}
        renderScheduleEventContent={renderScheduleEventContent}
      />
      <Modal show={show} onHide={toggleShow}>
      <Modal.Header closeButton>
          <Modal.Title>Class Details</Modal.Title>
       </Modal.Header>
       <ModalBody>
          <p>Title: {classDetails.title}</p>
          <p>Name: {classDetails.className}</p>
          <p>Venue: {classDetails.venue}</p>
          
          <p>Class Time: {(classDetails.start ==="") ? "" : classDetails.start.toLocaleTimeString()} -
           {(classDetails.end === "") ? "" : classDetails.end.toLocaleTimeString()}</p>
          <p>Type of Class: {classDetails.classType}</p>
       </ModalBody>
      </Modal>
    
      
    </div>
  );
};

export default Timetable;
