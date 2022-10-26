import React, {useEffect, useState} from 'react';
import axios from 'axios';
import "./style.css";
import ListGroup from 'react-bootstrap/ListGroup';


const ClashList = () => {


    useEffect(() => {
        // axios.get('/clash-requests')
        //      .then()
        //      .catch(); 
    },[]);

    const renderedItems = () => {
        //messages.map
    }

    return (
    <ListGroup variant="flush">
        <ListGroup.Item>Cras justo odio</ListGroup.Item>
        <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
        <ListGroup.Item>Morbi leo risus</ListGroup.Item>
        <ListGroup.Item>Porta ac consectetur ac</ListGroup.Item>
    </ListGroup>
    )
}

export default ClashList