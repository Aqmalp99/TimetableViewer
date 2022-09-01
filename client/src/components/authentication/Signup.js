import { useState, Fragment } from "react";
// Components Imports
import NavbarTemp from "../Navbar/Navbar";
// Bootstrap imports
import Container from "react-bootstrap/Container";
import { Button} from "react-bootstrap";
import { Form } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const Signup = () =>{
    // const [newUser, setnewUser] = useState(
    //     {
    //         username:"",
    //         fullname:"",
    //         email:"",
    //         password:"",
    //         // cpassword:"",
    //         role:"",
    //         notification:""

    //     }
    // );
    // let name, value;
    // const handelInput = (e) => {
    //     console.log(e);
    //     name = e.target.name;
    //     value = e.target.value;

    //     setnewUser({... newUser,[name]:value});
    //     const body = {newUser};
    //     console.log(newUser);
    // }

    const [username, setUsername] = useState("");
    const [fullname, setFullname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("");
    const [notification, setNotification] = useState("");

    const onUsernameChange = e => setUsername(e.target.value);
    const onFullnameChange = e => setFullname(e.target.value);
    const onEmailChange = e => setEmail(e.target.value);
    const onPasswordChange = e => setPassword(e.target.value);
    const onRoleChange = e => setRole(e.target.value);
    const onNotificationChange = e => setNotification(e.target.value);

    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            const body = {username, fullname, email, password,role,notification};
            const newUserRequest = await fetch("http://localhost:8080/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json"},
                body: JSON.stringify(body)
            });
            console.log(newUserRequest);

        }catch(err) {
            console.error(err.message);
        }
    }
    return(
        <>
            <div className="bg-container">
            <NavbarTemp/>
            <div className="login-container">
            <div className="login-box">
                <h1>Signup</h1>
                <br/>
                <Container>
                   <Form onSubmit={handleSubmit}>
                        <Row>
                            <Col>
                                <Form.Group className="mb-3" controlId="username">
                                    <Form.Label sm="4">User Name</Form.Label>
                                        <Form.Control type="text"
                                            name="username"
                                            // value={test}
                                            // onChange={e => setTest(e.target.value)} 
                                            value={username}
                                            onChange={onUsernameChange}
                                            placeholder="Enter Username" 
                                        />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group className="mb-3" controlId="fullnameID">
                                    <Form.Label sm="4">Full Name</Form.Label>
                                    <Form.Control type="text"
                                        name="fullname" 
                                        value={fullname}
                                        onChange={onFullnameChange}
                                        placeholder="Enter Full name" 
                                    
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Form.Group className="mb-3" controlId="emailID">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email"
                                    name="email"
                                    value={email}
                                    onChange={onEmailChange} 
                                    placeholder="Enter Email" 
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="PasswordID">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password"
                                    name="password"
                                    value={password}
                                    onChange={onPasswordChange} 
                                    placeholder="Password" 
                                />
                            </Form.Group>
                            {/* <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Confirm Password</Form.Label>
                                <Form.Control type="password" placeholder="Confirm Password" />
                            </Form.Group> */}
                            <Form.Group className="mb-3" controlId="roleID">
                                <Form.Label>Role</Form.Label>
                                <Form.Control type="text"
                                    name="role"
                                    value={role}
                                    onChange={onRoleChange} 
                                    placeholder="Enter Role" 
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="notificationID">
                                <Form.Label>Notification</Form.Label>
                                <Form.Control type="text"
                                    name="notification"
                                    value={notification}
                                    onChange={onNotificationChange} 
                                    placeholder="true/false" 
                                />
                            </Form.Group>
                        </Row>
                        <Form.Group className="mb-3" controlId="formBasicCheckbox">
                            <Form.Check type="checkbox" label="Agree Term and conditions" />
                        </Form.Group>
                        <Button variant="primary" type="submit" >
                            Submit
                        </Button>
                    </Form>
                </Container>
            </div>
        </div>
            </div>
        </>
    );
}
export default Signup;