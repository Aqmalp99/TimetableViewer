// routes
const authRouter = require("./routes/authRouter");
const signUpRouter = require("./routes/signUpRouter")
const timetableRouter = require('./routes/timetableRouter');
const routerUrl = require("./routes/routes")
const editUserRouter = require("./routes/editUserRouter");
///
const express = require('express');
const session = require("express-session");
const app = express();
const dotenv = require('dotenv').config();

const cors = require('cors');
const path = require('path');
const dbPool = require('./db/database');
// const dbPool = require('./db/dbCongif');
// session for user

app.use((req,res,next) => {
    req.pool = dbPool;
    next();
});

const PORT = process.env.PORT || 4000;
app.use(express.json());
app.use(cors());

// setting up the server and cookie
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
app.use('/', authRouter);
app.use('/', timetableRouter);
app.use("/", signUpRouter);
app.use("/", editUserRouter);

app.use('/test',routerUrl);

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