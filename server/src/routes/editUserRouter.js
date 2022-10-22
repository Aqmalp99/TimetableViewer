const express = require('express')
const editUserRouter = express.Router()
const bcrypt = require('bcrypt');
// const pool = require("../db/database")
const pool = require("../db/dbCongif");


editUserRouter.post('/editUser', async(req, res) => {
    try {
       
        const {username,password,notification} = req.body;
        let hashedPassword = await bcrypt.hash(password,10);
        const existingUser = await pool.query(
            "SELECT * FROM users WHERE username = $1",[username]
        );
        // check if the user is already registered
        if (existingUser.rowCount === 0){
            res.json({loggedIn: false, status:"Cannot edit"})
            console.log("edit fail")
            // console.log(existingUser.rows)
            
        } else{
            //register new user
            const addUser = await pool.query(
                `UPDATE users SET
                    password = $1, 
                    notification= $2
                    where username = $3`,
                    [hashedPassword,notification,username] 
            );
            res.status(200).json({status: "Edit Unsuccessfull"});
            
        }
    }catch(err){
        console.error(err.message);
    }
    
});

module.exports = editUserRouter