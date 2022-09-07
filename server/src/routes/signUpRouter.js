const express = require('express')
const signUpRouter = express.Router()
const bcrypt = require('bcrypt');
// const pool = require("../db/database")
const pool = require("../db/dbCongif");
const flash = require("express-flash");


signUpRouter.post('/signup', async(req, res) => {
    try {
       
        const {username, fullname, email, password,role,notification} = req.body;
        let hashedPassword = await bcrypt.hash(password,10);
        const existingUser = await pool.query(
            "SELECT * FROM users WHERE username = $1",[username]
        );
        // check if the user is already registered
        if (existingUser.rowCount === 0){
            //register new user
            const addUser = await pool.query(
                `INSERT INTO users(
                    username, 
                    fullname, 
                    email, 
                    password, 
                    role, 
                    notification
                    )
                    VALUES($1,$2,$3,$4,$5,$6);`,
                    [username, fullname, email,hashedPassword,role,notification] 
            );
            res.json({loggedIn: true, username: username});
        } else{
            res.json({loggedIn: false, status:"Username taken"})
            console.log("same user")
            // console.log(existingUser.rows)
        }
    //     const query = `INSERT INTO 
    //                      users(username, fullname, email, password, role, notification)
    //                       VALUES($1,$2,$3,$4,$5,$6);`

    //     await req.pool.connect((err, client, release) => {
    //         if (err) {
    //             return console.error('Error acquiring client', err.stack)
    //         }
    //         client.query(query, [username, fullname, email,hashedPassword,role,notification], (err, result) => {
    //             release();
    //             if (err) {
    //                 return console.error('Error executing query', err.stack)
    //             }
    //             // console.log(result.rows)
    //             res.send(result.rows);
    //             // req.flash('success_msg', "Yoo have added the user ");
                
    //             // console.log(data);
                
    //         })
    //     })
    //     console.log({
    //         username, fullname, email,password,role,notification
    //     });
    //     console.log(hashedPassword);
    //     // res.json(newUser);
    }catch(err){
        console.error(err.message);
    }
    
});

module.exports = signUpRouter