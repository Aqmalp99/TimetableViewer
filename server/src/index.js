const express = require('express');
const authRouter = require("./routes/authRouter");
const signUpRouter = require("./routes/signUpRouter")
const session = require("express-session");
const app = express();
// const mongoose = require('mongoose');
const dotenv = require('dotenv').config('.env');
const routerUrls = require('./routes/routes');
const timetableRouter = require('./routes/timetableRouter');
const cors = require('cors');
const path = require('path');
// const dbPool = require('./db/database');
const dbPool = require('./db/dbCongif');
// session for user
app.use(session({
    secret: "secret",
    credentials: true,
    name: "sid",
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: process.env.ENVIRONMENT === "production" ? "true": "auto",
        httpOnly: true,
        expires: 1000 * 60 * 60 * 24 * 7,
        sameSite: process.env.ENVIRONMENT === "production" ? "none" : "lax",
    }
})
);
// Messages
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
app.use("/", signUpRouter);
app.use("/", authRouter);

if (process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname, '../../client/build')));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, '../', '../', 'client', 'build', 'index.html'));
    });
}
else {
    app.get('/', (req, res) => res.send("set to production"));
}

app.listen(PORT,() =>{
    console.log(`Server connected at port ${PORT}`);
});