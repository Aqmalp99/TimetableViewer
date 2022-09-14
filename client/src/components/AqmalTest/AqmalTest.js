import React, { useCallback, useState } from "react";
import AqmalCalendar from "../AqmalCalendar/AqmalCalendar";
import Button from "react-bootstrap/Button";
import '../ShaeTest/styles.css';
import Modal from 'react-bootstrap/Modal';
import { ModalBody } from "react-bootstrap";

const ShaeTest = () => {
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [clashes, setClashes] = useState([]);
  const [show, setShow] = useState(false);
  const [venue, setVenue]= useState([]);

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
    setShow(!show)
  };

  
  const SelectedVenue = useCallback((event) => {
    setVenue(event);
    console.log(event);
  },[]);
  
  
  
  return (
    <div className="App">
      <p>My app</p>
      <AqmalCalendar displayClashes={displayClashes} ifEventSelected={ifEventSelected} SelectedVenue={SelectedVenue}/>
      <div className="button-group-flex">
        <Button className="me-3 mt-3" disabled={buttonDisabled}>
          Get Recommended Times
        </Button>
        <Button className="me-3 mt-3" disabled={buttonDisabled} onClick={showAlternateVenues}>
          Get Alternate Venues
        </Button>
      </div>
      <Modal show={show} onHide={showAlternateVenues}>
      <Modal.Header closeButton>
          <Modal.Title>Alternate Venues</Modal.Title>
       </Modal.Header>
       <ModalBody>
          <p>id: {venue}</p>
          <p><input type="radio" value="alt1" name="venue"/> EM205</p>
          <p><input type="radio" value="alt2" name="venue"/> IW218</p>
          <Button variant="primary" onClick={showAlternateVenues}>Accept</Button>
          
       </ModalBody>
      </Modal>
      <div className="clashes-container">
        {clashes}
      </div>
    </div>
  );
};

export default ShaeTest;
