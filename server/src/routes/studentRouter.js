const express = require('express');
const studentRouter = express.Router();
const bcrypt = require('bcrypt');
const saltRounds =10;
// const testData = require('../models/loginModels')

studentRouter.post('', (request,response) => {
    response.send(request.body);
    // const testing = new testData({
    //     name:request.body.name

    // })
    // Tests the request and response and saves the error in json formate  
    testing.save()
    .then(data => {
        response.json(data)
    })
    .catch(error => {
        response.json(error)
    })
});

module.exports = studentRouter