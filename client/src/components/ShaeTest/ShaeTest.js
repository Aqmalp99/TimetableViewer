import React, { useState } from "react";
import ShaeCalendar from "../ShaeCalendar/ShaeCalendar";
import Button from "react-bootstrap/Button";

const ShaeTest = () => {
  const [buttonDisabled, setButtonDisabled] = useState(true);

  const ifEventSelected = selected => {
    setButtonDisabled(selected ? false : true);
  }
  
  return (
    <div className="App">
      <p>My app</p>
      <ShaeCalendar ifEventSelected={ifEventSelected}/>
      <Button disabled={buttonDisabled}>
        Get Recommended Times
      </Button>
      <Button disabled={buttonDisabled}>
        Get Alternate Venues
      </Button>
    </div>
  );
};

export default ShaeTest;
