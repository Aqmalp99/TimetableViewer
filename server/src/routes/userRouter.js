const express = require('express');
const userRouter = express.Router();

userRouter.post('', (req,res) => {
    res.send(req.body);
    
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