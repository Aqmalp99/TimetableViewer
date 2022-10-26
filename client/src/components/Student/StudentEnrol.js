import React, {useState, useEffect, useRef} from 'react'
import { Navigate,useNavigate } from 'react-router-dom';
import { Buffer } from "buffer";
import NavbarStudent from '../Navbar/NavbarStudent'
import { Button, Form } from 'react-bootstrap'
import "./styles.css";
import EnrolCalendar from './EnrolCalendar';
import axios from 'axios';
import { detectNewClash } from './detectNewClash';
import io from 'socket.io-client';


function getToken() {
    const tokenString = sessionStorage.getItem('token');
    const userToken = JSON.parse(tokenString);
    console.log(userToken);
    return userToken;
}
function getRole() {
    const token = getToken();
    if (token != null){
        const base64Url = token.split('.')[1];
        const buff = Buffer.from(base64Url, 'base64');
        const payloadinit = buff.toString('ascii');
        const payload = JSON.parse(payloadinit);
        const role=payload.role;
        return role;
    }
    return "noRole";
}
const socket = io("/", {
    
    query: {
        role: getRole(),
    }
  });


const StudentEnrol = () => {
    const navigate= useNavigate();
    const [otherClasses, setOtherClasses] = useState([]);
    const [selectedOption, setSelectedOption] = useState({});
    const classesRef = useRef(null);

    

    useEffect(()=>{
        const fetchClasses = async () => {
            await axios
                            .get(`/classes`, { params: { id: id } })
                            .then((res) => {
                                console.log(res)
                                setOtherClasses(res.data);
                            })
                            .catch((err) => {
                                console.log(err);
                            });
        }

        fetchClasses();
    }, [])

    const onSelectChange = (e) => {
        const index = e.target.selectedOptions[0].getAttribute('data-id');
        if (index === null){
            classesRef.current.addTempClass(null);
            setSelectedOption({});
        }
        else {
            classesRef.current.addTempClass(otherClasses[index]);
            setSelectedOption(otherClasses[index]);
        }
    }

    const onFormSubmit = (e) => {
        e.preventDefault();
        let classes = classesRef.current.getAllClasses();
        classes.pop(); //remove currently selected option
        const clashes = detectNewClash(selectedOption, classes);
        if (clashes.length > 0){
            socket.emit("send_message", {id: payload.id,student_id: payload.student_id});
        }
        console.log(selectedOption);
        const insertEnrolment = async () => {
            const body = { user_id: payload.id, class_id: selectedOption.class_id };
            await axios
            .post(`/student/enrol`, body)
            .then((res) => {
                navigate("/student");
            })
            .catch((err) => {
                console.log(err);
            });
        }

        insertEnrolment();

    }
    
    const options = otherClasses.map((element, index) => {
        if (element.class_name != null){
        return (<option data-id={index} key={index}>
            {element.class_code} {element.class_name} {element.class_type} {element.start_date} {element.start_time} {element.end_time}
            </option>)
        }
    })

    const token = getToken();
    if(!token)
    {
        console.log(getToken());
        return <Navigate to='/'/>;
    }
    

    const base64Url = token.split('.')[1];
    const buff = Buffer.from(base64Url, 'base64');
    const payloadinit = buff.toString('ascii');
    const payload = JSON.parse(payloadinit);
    const id=payload.id;
    const role = payload.role;
    if( role === 'admin')
        return <Navigate to='/admin'/>;
    else if ( role === 'teacher')
        return <Navigate to='/teacher'/>;
    else if (role !== 'student')
        return <Navigate to='/'/>;
    
    
    return (
        <div>
            <NavbarStudent />
            <div className='enrol-form-container'>
                <Form className='enrol-form'>
                    <Form.Group className="mb-3 mt-5" controlId="searchID">
                        <Form.Label>Enrol in a Class</Form.Label>
                        <Form.Select onChange={(e) => onSelectChange(e)}>
                            <option>Please Select a Class</option>
                            {options}
                        </Form.Select>
                    </Form.Group>
                    <Button onClick={onFormSubmit} variant="primary" type="submit">Confirm</Button>
                </Form>
            </div>
            <EnrolCalendar id={id} ref={classesRef}/>
            {console.log(selectedOption)}
        </div>
    )
}

export default StudentEnrol