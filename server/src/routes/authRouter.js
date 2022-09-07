const express = require('express')
const bcrypt = require('bcrypt');
const { deleteOne } = require('../models/loginModels');
// const pool = require("../db/database")
const pool = require("../db/dbCongif");
const authRouter = express.Router();


authRouter.post('/', async(req, res) => {
    try {
       
        const {username, password} = req.body;
        const loginCheck = await pool.query(
            `SELECT username,password,role FROM users u 
            WHERE u.username = $1`,[username]
        );
        if (loginCheck.rowCount > 0){
            const isMatch = await bcrypt.compare(password, loginCheck.rows[0].password);
            if(isMatch)
            {
                req.session.user = {
                    username: username,
                    role: loginCheck.rows[0].role
                }
                console.log(req.session);
            }
            else{
                // pass is incorrect
                console.log("password incorrect");
                res.json({loggedIn: false, status:"Username or Password is wrong"});
            }
        }else{
            // user name is incorrect
            console.log("username incorrect");
            res.json({loggedIn: false, status:"Username or Password is wrong"});
        }
    }catch(err){
        console.error(err.message);
    }
    
});

module.exports = authRouter