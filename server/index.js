
// const express = require("express");
// const cors = require('cors');
// const dotenv = require('dotenv');
// const dbPool = require("./src/db/dbCongif");
// const authRouter = require("./src/routes/authRouter");
// dotenv.config();
// // const authRouter = require('./src/routes/authRouter')

// // Port {PORT} for heroku and 5000 for development
// const PORT = process.env.PORT || 8080;
// const app = express();
// app.use((req,res,next) => {
//     req.pool = dbPool;
//     next();
// });
// // Hides the server details from the user(security)
// app.disable('x-powered-by');

// // Middleware
// app.use(cors());
// app.use(express.json());

// app.use("/", signUpRouter);
// app.use("/", authRouter);

// // test 
// // app.post("/signup", async(req, res) =>{
// //     try {
// //         const {username, fullname, email, password,role,notification} = req.body;
// //         // const newUser = await pool.query(
// //         //     "INSERT INTO todo (description) VALUES($1)",
// //         //     [test]
        
// //         // );
// //         console.log({
// //             username, fullname, email, password,role,notification
// //         });
// //         // res.json(newUser);
// //     }catch(err){
// //         console.error(err.message);
// //     }
// // });

// app.listen(PORT, () => 
// {
//     console.log(`Server is connected on ${PORT}`)

// });


