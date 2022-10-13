var express = require('express');
// var router = express.Router();
var nodemailer = require('nodemailer');
const creds = require('../config/config');

var transport = {
  host: 'smtp.gmail.com',
  auth: {
    user: creds.USER,
    pass: creds.PASS
  }
}

var transporter = nodemailer.createTransport(transport)

transporter.verify((error, success) => {
  if (error) {
    console.log(error);
  } else {
    console.log('Server is ready to take messages');
  }
});

const emailRouter = express.Router();

emailRouter.post('/send', async(req,res) => {
    try{
        const { name, message, date_time, venue, class_type } = req.body;
        var email = 'chen.stephen141@gmail.com' //change this to be fetched from db by filter(emails of students who are enrolled to that class)
        var content = `Your class has been updated!\nName: ${name}\nDate and time: ${date_time}\nVenue: ${venue}\nClass type: ${class_type}\nMessage: ${message}`
      
        var mail = {
          from: 'chen.stephen151@gmail.com',
          to: email,
          subject: 'Class details updated for ' + name,
          text: content
        }
      
        transporter.sendMail(mail, (err, data) => {
          if (err) {
            res.json({
              msg: 'fail'
            })
          } else {
            res.json({
              msg: 'success'
            })
          }
        })
    }catch(error){
        res.status(401).json({error: error.message});
    }
});


module.exports = emailRouter
