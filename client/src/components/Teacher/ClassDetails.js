import React from 'react'
import Modal from 'react-bootstrap/Modal';
import { ModalBody } from "react-bootstrap";

const ClassDetails = ({showClassDetails, onClassClick, selectedClass}) => {
    return (
    <>
    <Modal show={showClassDetails} onHide={onClassClick}>
      <Modal.Header closeButton>
          <Modal.Title>Class Details</Modal.Title>
       </Modal.Header>
       <ModalBody>
          <p>Title: {selectedClass.title}</p>
          <p>Name: {selectedClass.className}</p>
          <p>Venue: {selectedClass.venue}</p>
          <p>Class Size: {selectedClass.classSize}</p>
          <p>Class Time: 
            {(selectedClass.start ===undefined) ? "" : selectedClass.start.toLocaleTimeString()} 
            -
            {(selectedClass.end === undefined) ? "" : selectedClass.end.toLocaleTimeString()}
           </p>
          <p>Type of Class: {selectedClass.classType}</p>
       </ModalBody>
    </Modal>
    </>
    )
}

export default ClassDetails;