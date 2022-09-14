import React, { useState } from "react";
import ShaeCalendar from "../ShaeCalendar/ShaeCalendar";
import Button from "react-bootstrap/Button";
import './styles.css';

const ShaeTest = () => {
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [clashes, setClashes] = useState([]);

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
  
  return (
    <div className="App">
      <p>My app</p>
      <ShaeCalendar displayClashes={displayClashes} ifEventSelected={ifEventSelected}/>
      <div className="button-group-flex">
        <Button className="me-3 mt-3" disabled={buttonDisabled}>
          Get Recommended Times
        </Button>
        <Button className="me-3 mt-3" disabled={buttonDisabled}>
          Get Alternate Venues
        </Button>
      </div>
      <div className="clashes-container">
        {clashes}
      </div>
    </div>
  );
};

export default ShaeTest;
