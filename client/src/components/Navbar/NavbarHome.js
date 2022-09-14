import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card  from 'react-bootstrap/Card';
// import { displaySignup } from '../authentication/Home';

const NavbarHome = () => {
  return (
    <>
    <Card fluid  border="dark">
      <Navbar bg="light" variant="light">
        <Container>
        <Navbar.Brand text="red" href="/">
          Uni Timetable
          </Navbar.Brand>
        <Container fluid>
            <Row>
              <Col md={{ span: 2, offset: -1 }} >
                <Nav className="me-auto">
                  <Nav.Link href="/about">About</Nav.Link>
                </Nav>
              </Col>
            </Row>
          </Container>
        </Container>
      </Navbar>
    </Card>   
      <br />
      
    </>
  );
}

export default NavbarHome;