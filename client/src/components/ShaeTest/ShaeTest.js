import React, { useState } from "react";
import ShaeCalendar from "../ShaeCalendar/ShaeCalendar";
import Button from "react-bootstrap/Button";

const ShaeTest = () => {
  const [buttonState, setButtonState] = useState(true);
  
  return (
    <div className="App">
      <p>My app</p>
      <ShaeCalendar />
      <Button disabled={buttonState}>
        Get Recommended Times
      </Button>
    </div>
  );
};

export default ShaeTest;
