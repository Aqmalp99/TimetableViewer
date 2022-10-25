import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

const NavbarTeacher = () => {
  return (
    <div>
        <Navbar bg="light" expand="lg" sticky="top"> 
            <Container>
                <Navbar.Brand href="/student">University Timetable</Navbar.Brand>
                <Navbar.Toggle  />
                
                <Navbar.Collapse className="justify-content-end">
                    <Nav className="me-right">
                      <Nav.Link href="/student">Home</Nav.Link>
                      <Nav.Link href="/student/enrol">Enrol in Class</Nav.Link>
                      <Nav.Link href="/student/inbox">Inbox</Nav.Link>
                      <Nav.Link href="/student/settings">Settings</Nav.Link>
                      <Nav.Link href="/">Logout</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    </div>
  );
}

export default NavbarTeacher;