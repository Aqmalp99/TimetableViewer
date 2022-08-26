import React, { useState, useMemo, useEffect, useCallback } from "react";
import "@mobiscroll/react/dist/css/mobiscroll.min.css";
import { Eventcalendar, getJson, toast } from "@mobiscroll/react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { ModalBody } from "react-bootstrap";


const Timetable = () => {
  const [myEvents, setEvents] = React.useState([{
    start: "09:00",
    end: "11:00",
    recurring: {
      repeat: "weekly",
      weekDays: "TH, FR"
    },
    title: "ESAS2",
    venue: "IW 218",
    description: "In class lab work",
    typeOfClass: "workshop"
  }

  ]);

  // React.useEffect(() => {
  //   getJson(
  //     "https://trial.mobiscroll.com/events/?vers=5",
  //     (events) => {
  //       setEvents(events);
  //     },
  //     "jsonp"
  //   );
  // }, []);

  const [show, setShow] = useState(false);

  const toggleShow = () => {
    setShow(!show)
  };

  const [classDetails, setClassDetails]=useState(
    { title: "",
    venue: "",
    description: "",
    typeOfClass: "",
    startTime: "",
    endTime: ""

  });
  
  const onEventClick = React.useCallback((event) => {
    setShow(!show);
    setClassDetails({
      title: event.event.title,
      venue: event.event.venue,
      description: event.event.description,
      typeOfClass: event.event.typeOfClass,
      startTime: event.event.start,
      endTime: event.event.end
    
    }
      );
    console.log(classDetails);

  }, [classDetails,show]);


  const view = React.useMemo(() => {
    return {
      
      schedule: {
        type: "week",
        startTime: "07:00",
        endTime: "19:00",
        labels: true, 
        popover: true,
      },
    };
  }, []);

  
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
      />
      <Modal show={show} onHide={toggleShow}>
      <Modal.Header closeButton>
          <Modal.Title>Class Details</Modal.Title>
       </Modal.Header>
       <ModalBody>
          <p>Title: {classDetails.title}</p>
         
          <p>Venue: {classDetails.venue}</p>
          <p>Type of Class: {classDetails.typeOfClass}</p>
          <p>Description: {classDetails.description}</p>
       </ModalBody>
      </Modal>
    
      
    </div>
  );
};

export default Timetable;
