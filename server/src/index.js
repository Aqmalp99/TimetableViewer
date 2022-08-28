const express = require('express');
const app = express();
// const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const routerUrls = require('./routes/routes');
const timetableRouter = require('./routes/timetableRouter');
const cors = require('cors');
const path = require('path');
const dbPool = require('./db/database');

app.use((req,res,next) => {
    req.pool = dbPool;
    next();
});

// require('dotenv').config({ path: path.resolve(__dirname, './.env') });

// dotenv.config()

// mongoose.connect(process.env.DATABASE_CONNECT,()=>{
//     console.log("Database connected")
// });

const PORT = process.env.PORT || 4000;
app.use(express.json());
app.use(cors())
app.use('/app',routerUrls);
app.use('/', timetableRouter);

app.listen(PORT,() =>{
    console.log(`Server connected at port ${PORT}`);
});