const express = require('express')
const router = express.Router()
const pool = require("../db/dbCongif");

router.get('/', async (req,res) => {
    try{
        const userDetails = await pool.query(
            `SELECT * FROM users;`
        );
        res.json({userDetails: userDetails.rows});

    }catch(error){
        res.status(500).json({error:error.message});
    }
});

module.exports = router