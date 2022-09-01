const express = require('express');
const bcrypt = require('bcrypt');
// const pool = require("../../dbCongif")
const authRouter = express.Router();

// authRouter.post('/', async(req, res) => {
//     try {
       
//         const {username,password} = req.body;
//         let hashedPassword = await bcrypt.hash(password,10);
        
//         console.log({
//             username,password
//         });
//         console.log(hashedPassword);
//         // res.json(newUser);
//     }catch(err){
//         console.error(err.message);
//     }
// });


authRouter.post('/', async (req, res) => {
    const query = `
    SELECT * FROM users ;`;
    await req.pool.connect((err, client, release) => {
        if (err) {
            return console.error('Error acquiring client', err.stack)
        }
        client.query(query, [req.body.username], (err, result) => {
            release();
            if (err) {
                return console.error('Error executing query', err.stack)
            }
            console.log(result.rows)
            res.send(result.rows);
            // console.log(data);
        })
    })
});



module.exports = authRouter