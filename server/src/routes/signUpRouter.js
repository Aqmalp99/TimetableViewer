const express = require('express')
const signUpRouter = express.Router()
const bcrypt = require('bcrypt');
const pool = require("../../dbCongif")



signUpRouter.post('/signup', async(req, res) => {
    try {
       
        const {username, fullname, email, password,role,notification} = req.body;
        let hashedPassword = await bcrypt.hash(password,10);
        // const query1 = `INSERT INTO 
        //             users(username, fullname, email, password, role, notification)
        //             VALUES($1,$2,$3,$4,$5,$6);`, [username, fullname, email,password,role,notification];
        // await pool.query(query1,[username, fullname, email,password,role,notification]);
        
        // const newUser = pool.query(
        //     `
        //     INSERT INTO users(username, fullname, email, password, role, notification)
        //     VALUES($1,$2,$3,$4,$5,$6)
        //     `, [username, fullname, email,password,role,notification]
        // );
        console.log({
            username, fullname, email,password,role,notification
        });
        console.log(hashedPassword);
        // res.json(newUser);
    }catch(err){
        console.error(err.message);
    }
    
});

module.exports = signUpRouter