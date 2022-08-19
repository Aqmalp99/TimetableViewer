import React from "react";
import ShaeCalendar from "../ShaeCalendar/ShaeCalendar";
import Button from "react-bootstrap/Button";

const ShaeTest = () => {
  return (
    <div className="App">
      <p>My app</p>
      <ShaeCalendar />
      <Button>
        Get Recommended Times
      </Button>
    </div>
  );
};

export default ShaeTest;
