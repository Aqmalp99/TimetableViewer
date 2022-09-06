import Timetable from "./Timetable";
import React from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Container } from "react-bootstrap";
import NotificationLogo from "./notification_icon.png";

const TimetableView = () => {
  return (

    <div>
        <Navbar bg="light" expand="lg" sticky="top"> 
            <Container>
                <Navbar.Brand href="/Timetable">University Timetable</Navbar.Brand>
                <Navbar.Toggle  />
                
                <Navbar.Collapse className="justify-content-end">
                    <Nav className="me-auto">
                        <Nav.Link href="#home">Home</Nav.Link>
                    </Nav>
                    <Nav className="me-right">
                    <Nav.Link href="/notifications">
                        <img width="20px" height="auto" src={NotificationLogo}  alt="logo" />
                    </Nav.Link>
                    <Nav.Link href="/">Logout</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
        <Timetable/>
    </div>
  )
}
export default TimetableView;