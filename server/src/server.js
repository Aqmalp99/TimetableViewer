import {PORT, NODE_ENV} from './config'; // added
const express = require('express'); // a/p
const app = express();// a/p
// const mongoose = require('mongoose');
// const dotenv = require('dotenv');
// const routerUrls = require('./routes/routes');
// const cors = require('cors');
// const path = require('path');
// require('dotenv').config({ path: path.resolve(__dirname, './.env') });

// dotenv.config()

// mongoose.connect(process.env.DATABASE_CONNECT,()=>{
//     console.log("Database connected")
// });
app.disable('x-powered-by'); //ap Hides what server is used from user.
app.use(express.urlencoded({extended:true})); // a  uses the inbuilt express body parser
app.use(express.json());//ap
// app.use(cors())
// app.use('/app',routerUrls);

app.listen(PORT,() =>{
    console.log(`Listening on port ${PORT}`)
}); //ap