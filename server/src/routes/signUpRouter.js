const express = require('express')
const signUpRouter = express.Router()
const bcrypt = require('bcrypt');
// const pool = require("../db/database")
const pool = require("../db/dbCongif");


signUpRouter.post('/signup', async(req, res) => {
    try {
       
        const {username, fullname, email, password,role,notification} = req.body;
        const notification1 = true;
        const role1 = "student";

        let hashedPassword = await bcrypt.hash(password,10);
        const existingUser = await pool.query(
            "SELECT * FROM users WHERE uni_id = $1",[username]
        );
        // check if the user is already registered
        if (existingUser.rowCount === 0){
            //register new user
            const addUser = await pool.query(
                `INSERT INTO users( 
                    uni_id,
                    username, 
                    password, 
                    role, 
                    notification,
                    first_name,
                    surname
                    )
                    VALUES($1,$2,$3,$4,$5,$6);`,
                    [email,hashedPassword,role1,notification1,username,fullname] 

            );
            res.status(200).json({status: "signup successfull"});
        } else{
            res.json({loggedIn: false, status:"Username taken"})
            console.log("same user")
            // console.log(existingUser.rows)
        }
    }catch(err){
        console.error(err.message);
    }
    
});

module.exports = signUpRouter