const express = require('express');
const app = express();
// const mongoose = require('mongoose');
// const dotenv = require('dotenv');
const routerUrls = require('./routes/routes');
const cors = require('cors');
const path = require('path');
// require('dotenv').config({ path: path.resolve(__dirname, './.env') });

// dotenv.config()

// mongoose.connect(process.env.DATABASE_CONNECT,()=>{
//     console.log("Database connected")
// });
app.use(express.json());
app.use(cors())
app.use('/app',routerUrls);

app.listen(4000,() =>{
    console.log("Server connected at port 4000")
});