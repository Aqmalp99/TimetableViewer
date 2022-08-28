const express = require('express');
const router = express.Router();

router.get('/staff/:id', async (req, res) => {
    const query = `SELECT * FROM users`;
    await req.pool.connect((err, client, release) => {
        if (err) {
            return console.error('Error acquiring client', err.stack)
        }
        client.query(query, (err, result) => {
            release();
            if (err) {
                return console.error('Error executing query', err.stack)
            }
            console.log(result.rows)
        })
    })

    res.sendStatus(200);
});

module.exports = router;