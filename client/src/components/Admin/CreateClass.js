import React, { useState } from "react";
import NavbarAdmin from '../Navbar/NavbarAdmin';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';
import { ModalBody } from "react-bootstrap";
import "./style.css";

const CreateClass = () => {

    const [showVenues,setShowVenues]= useState(false);
    const [availableVenues, setAvailableVenues]= useState([]);
    const [formDetails,setFormDetails]=useState({});


    const showAvailableVenues = (e) => {
        e.preventDefault();
        const date= formDetails.date;
        const startTime= formDetails.start_time;
        const endTime= formDetails.end_time;
        const getVenues = async () => {
          await axios
            .get(`/teacher/venues`, { params: {date:date , start_time: startTime, end_time: endTime}})
            .then((response)=> {
              let data = response.data.map(element => {
                return {
                  venueID: element.venue_id,
                  venue: element.room_code + " / " + element.building,
                  capacity: element.capacity
                };
              })
              console.log(data);
              setAvailableVenues(data);
            })
            .catch((err) => console.log(err))
          }
        setShowVenues(!showVenues);
        getVenues();
      };

      const chooseVenue = (e) => {
        setFormDetails({...formDetails, capacity: e.target.value});
      }
      const closeModal = () => {
        setShowVenues(!showVenues);
      }
      const submitNewClass = () => {
        const body = {formDetails};
        const newClass = async () => {
            await axios
              .post(`/admin/create-class`, body)
              .then((response)=> {
                console.log(response);
              })
              .catch((err) => console.log(err))
            }
          setShowVenues(!showVenues);
          newClass();
      }

  return (
    <div>
        <NavbarAdmin/>
        <h1> Create A New Class</h1>
        <div className="search-flex">
            <div className="search-form">
                <Form onSubmit={showAvailableVenues}>
                    <Form.Group className="mb-3" >
                        <Form.Label>Class Code:</Form.Label>
                        <Form.Control type="text" placeholder="COMP SCI 1011" onChange={(event) => {setFormDetails({...formDetails, class_code: event.target.value});}} />
                    </Form.Group>
                    <Form.Group className="mb-3" >
                        <Form.Label>Class Name:</Form.Label>
                        <Form.Control type="text" placeholder="Operating Systems"   onChange={(event) => {setFormDetails({...formDetails, class_name: event.target.value});}}/>
                    </Form.Group>
                    <Form.Group className="mb-3" >
                        <Form.Label>Class Type:</Form.Label>
                        <Form.Control type="text" placeholder="Lecture"   onChange={(event) => {setFormDetails({...formDetails, class_type: event.target.value});}}/>
                    </Form.Group>
                    <Form.Group className="mb-3" >
                        <Form.Label>Start Date:</Form.Label>
                        <Form.Control type="date"    onChange={(event) => {setFormDetails({...formDetails, date: event.target.value});}}/>
                    </Form.Group>
                    <Form.Group className="mb-3" >
                        <Form.Label>Start Time:</Form.Label>
                        <Form.Control type="time"  onChange={(event) => {setFormDetails({...formDetails, start_time: event.target.value});}}/>
                    </Form.Group>
                    <Form.Group className="mb-3" >
                        <Form.Label>End Time:</Form.Label>
                        <Form.Control type="time"  onChange={(event) => {setFormDetails({...formDetails, end_time: event.target.value});}}/>
                    </Form.Group>
                    <Form.Group className="mb-3" >
                        <Form.Label>capacity:</Form.Label>
                        <Form.Control type="number"  onChange={(event) => {setFormDetails({...formDetails, capacity: event.target.value});}}/>
                    </Form.Group>
                    <Button variant="primary" type="submit">Show Available Venues</Button>
                </Form>

                <Modal show={showVenues} onHide={closeModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>List Of Available venues</Modal.Title>
                    </Modal.Header>
                    <ModalBody>
                        <label htmlFor="venues">Choose an Available Venue:</label>
                        <select onChange={chooseVenue}>
                            {availableVenues.map((element,index) =>{ 
                                return <option key={index} value={element.venueID}>{element.venue}</option>
                            }
                            )}
                        </select>
                        <Button variant="primary" onClick={submitNewClass}>Accept</Button>
                    </ModalBody>
                </Modal>
                
            </div>
        </div>
    </div>
  )
}

export default CreateClass;