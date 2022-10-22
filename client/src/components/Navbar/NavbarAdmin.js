import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card  from 'react-bootstrap/Card';
import  { Navigate } from 'react-router-dom';

// import { displaySignup } from '../authentication/Home';

const NavbarAdmin = () => {
  return (
    <div>
        <Navbar bg="light" expand="lg" sticky="top"> 
            <Container>
                <Navbar.Brand href="/Timetable">University Timetable</Navbar.Brand>
                <Navbar.Toggle  />
                
                <Navbar.Collapse className="justify-content-end">
                    <Nav className="me-right">
                      <Nav.Link href="/admin">Home</Nav.Link>
                      <Nav.Link href="/admin/create-class">Create Class</Nav.Link>
                      <Nav.Link href="/admin/inbox">Inbox</Nav.Link>
                      <Nav.Link href="/">Logout</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
        
    </div>
  );
}

export default NavbarAdmin;