import React, {useEffect, useState} from 'react';
import NavbarAdmin from '../Navbar/NavbarAdmin';
import "./style.css";
import io from "socket.io-client";
import ClashList from './ClashList';
import axios from 'axios';
import ListGroup from 'react-bootstrap/ListGroup';
import moment from 'moment-timezone';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const socket = io("/", {
  query: {
      role: "admin",
  }
});

const AdminInbox = () => {
    const navigate = useNavigate();
    const [clashes, setClashes] = useState([]);
    // const [selectedMessage, setSelectedMessage] = useState(0);

    useEffect(() => {
        const fetchClashes = async () => {
            await axios
            .get(`/admin/clashes`)
            .then((res) => {
                console.log(res)
                setClashes(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
        }

        fetchClashes();
    }, []);

    useEffect(() => {
        socket.on("receive_message", (data) => {
            
            // const newData = [...clashes];
            const newInput = {uni_id: data.student_id, date_time: moment().format()}
            // newData.push(newInput);
            // console.log(newData);
            setClashes( (oldArray) => [...oldArray, newInput]);
        })
    }, [socket]);
    
    const onClick= (e) => {
        console.log(e.target.value);
        navigate('/admin' , {state: { student_id: e.target.value}})
    }
    const renderedClashes = clashes.map((element,index) => {
        return (<ListGroup.Item key = {index}>{element.uni_id} <Button value={element.uni_id} onClick={onClick}> Resolve Clash</Button></ListGroup.Item>)
    })


    return (<>
        <NavbarAdmin />
        <h1>Admin Inbox!</h1>
        <div className='inbox-wrapper'>
                <div className='inbox-list'>
                    <ListGroup variant="flush">
                        {renderedClashes}
                    </ListGroup>
                </div>
        </div>
    </>)
}

export default AdminInbox;