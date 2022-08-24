import studentRouter from './studentRouter';

export{studentRouter};


// const express = require('express')
// const router = express.Router()
// const testData = require('../models/loginModels')

// router.post('/shae', (request,response) => {
//     const testing = new testData({
//         name:request.body.name

//     })  
//     testing.save()
//     .then(data => {
//         response.json(data)
//     })
//     .catch(error => {
//         response.json(error)
//     })
// });

// module.exports = router