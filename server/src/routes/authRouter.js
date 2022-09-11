const express = require('express')
const bcrypt = require('bcrypt');
// const pool = require("../db/database")
const pool = require("../db/dbCongif");
const jwt = require('jsonwebtoken');
const jwtTokens = require('../utilities/jwt-helper');


const authRouter = express.Router();

authRouter.post('/', async(req,res) => {
    try{
        const {username, password} = req.body;
        const loginCheck = await pool.query(
            `SELECT username,password,role FROM users u 
            WHERE u.username = $1`,[username]
        );
         
        if(loginCheck.rows.length === 0)
        {
            console.log("wrong username");
            return res.status(401).json({error: "Username or Password in incorrect"});
        }
        const validPassword = await bcrypt.compare(password, loginCheck.rows[0].password);
        if(!validPassword)
        {
            console.log("wrong password");
            return res.status(401).json({error: "Username or Password in incorrect"});
        }
        if(loginCheck.rowCount > 0 && validPassword)
        {
            console.log("Good for login");
            // console.log(loginCheck.rows[0])
            let user = {username: loginCheck.rows[0].username , role:loginCheck.rows[0].role}
            console.log(user);
            let tokens = jwtTokens(user);
            res.cookie('refresh_token', tokens.refreshToken, {httpOnly: true});
            res.json(tokens);
            console.log(tokens);
        }

    }catch(error){
        res.status(401).json({error: error.message});
    }

});
// authRouter.post('/', async(req, res) => {
//     try {
       
//         const {username, password} = req.body;
//         const loginCheck = await pool.query(
//             `SELECT username,password,role FROM users u 
//             WHERE u.username = $1`,[username]
//         );
//         if (loginCheck.rowCount > 0){
//             const isMatch = await bcrypt.compare(password, loginCheck.rows[0].password);
//             if(isMatch)
//             {
//                 req.session.user = {
//                     username: username,
//                     role: loginCheck.rows[0].role
//                 }
//                 console.log(req.session.user.role);
//                 // console.log(req.session);
//                 res.json({loggedIn: true, username: username, role: loginCheck.rows[0].role });
//                 // console.log(req);
//             }
//             else{
//                 // pass is incorrect
//                 console.log("password incorrect");
//                 res.json({loggedIn: false, status:"Username or Password is wrong"});
//             }
//         }else{
//             // user name is incorrect
//             console.log("username incorrect");
//             res.json({loggedIn: false, status:"Username or Password is wrong"});
//         }
//     }catch(err){
//         console.error(err.message);
//     }
    
// });

module.exports = authRouter