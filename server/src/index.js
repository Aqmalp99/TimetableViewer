// routes
const authRouter = require("./routes/authRouter");
const signUpRouter = require("./routes/signUpRouter")
const timetableRouter = require('./routes/timetableRouter');
const routerUrl = require("./routes/routes")
const editUserRouter = require("./routes/editUserRouter");
const emailRouter = require("./routes/emailRouter")
///
const express = require('express');
const session = require("express-session");
const app = express();
const dotenv = require('dotenv').config();
const server = require('http').createServer(app);
// const server = http.createServer(app);
const io = require('socket.io')(server, { transports: ["websocket", "polling"] , cors: {
  origin: "http://localhost:3000",
  methods: ["GET", "POST"],
}, 
allowEIO3: true
});
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

// const io = new Server(httpServer, {
//     cors: {
//       origin: "http://localhost:3000",
//       methods: ["GET", "POST"],
//     },
//   });

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

app.use('/', emailRouter);

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

io.on("connection", async (socket) => {
    console.log(`User connected: ${socket.id}`);
    const role = socket.handshake.query.role;
    const id = socket.handshake.query.id;
    
    if (role === 'admin')
        await socket.join('0');
    else if (role === 'student')
        await socket.join(String(id));
  
    console.log(`User ${id} rooms:`);
    console.log(socket.rooms);
  
    socket.on("send_message", async (data) => {
        console.log(data);
        const insertQuery = `INSERT INTO clash_request (user_id, date_time)
                              VALUES ($1,NOW());`;
          const updateQuery = `UPDATE users SET clash_resolved = 'not_approved'`;
          await dbPool.query(insertQuery, [data.id]);
          await dbPool.query(updateQuery);
        socket.to('0').emit("receive_message", data);
      })

    socket.on("send_message_admin", async (data) => {
        console.log(`data`);
        console.log(data);
        const insertQuery = `INSERT INTO notification (user_id, type)
                              VALUES ($1,'approval')
                              RETURNING notification_id;`;
        const updateQuery = `UPDATE users SET clash_resolved = 'approved' WHERE user_id = $1`;
        
        const { rows } = await dbPool.query(insertQuery, [data.id]);
        await dbPool.query(updateQuery, [data.id]);

        console.log(rows[0].notification_id);
        socket.to(String(data.id)).emit("receive_message", { type: 'approval', notification_id: rows[0].notification_id });
      })
  });
  
server.listen(PORT, () => {
console.log(`Server listening on port ${PORT}`);
});