const express = require('express')
const bcrypt = require('bcrypt');
const { deleteOne } = require('../models/loginModels');
// const pool = require("../db/database")
const authRouter = express.Router();


authRouter.post('/', async(req, res) => {
    try {
       
        const {username, password} = req.body;
        let hashedPassword = await bcrypt.hash(password,10);
        const query = `SELECT * FROM users WHERE username = $1`

        await req.pool.connect((err, client, release) => {
            if (err) {
                return console.error('Error acquiring client', err.stack)
            }
            client.query(query, [username], (err, result) => {
                release();
                if (err) {
                    return console.error('Error executing query', err.stack)
                }
                console.log(result.rows)
                // if (result.rows.length > 0){
                //     const user = result.rows[0]
                //     bcrypt.compare(password,user.password, (err, isMatch){
                //         if (err){
                //             throw err
                //         }
                //         if(isMatch){
                //             return done(null, user);
                //         }else{
                //             return done(null, false, {message: "incorrect password"});
                //         }
                //     });

                // }else {
                //     return done(null, false, {message: "Username not matched"});
                // }
                // console.log(data);
            })
        });
        console.log({
            username
        });
        // console.log(hashedPassword);
        // res.json(newUser);
    }catch(err){
        console.error(err.message);
    }
    
});

module.exports = authRouter