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
    title: "ESAS2"
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

  const [title, setTitle]=useState("");
  
  const onEventClick = React.useCallback((event) => {
    setShow(!show);
    setTitle(event.event.title);
    console.log(title);

  }, [title,show]);


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
          <p>{title}</p>
       </ModalBody>
      </Modal>
      {console.log(myEvents)}
      
    </div>
  );
};

export default Timetable;
