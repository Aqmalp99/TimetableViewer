const express = require('express');
const router = express.Router();

router.get('/staff/:id', async (req, res) => {
    const query = `SELECT class.class_code, class.class_name, class.class_type, class.start_date, class.start_time, class.end_time, venue.room_code, venue.building from staff_enrolments
                   INNER JOIN class
                   ON class.class_id = staff_enrolments.class_id
                   INNER JOIN venue
                   ON class.venue_id = venue.venue_id
                   WHERE staff_enrolments.staff_id = 1;`;
    let data = "";
    await req.pool.connect((err, client, release) => {
        if (err) {
            return console.error('Error acquiring client', err.stack)
        }
        client.query(query, (err, result) => {
            release();
            if (err) {
                return console.error('Error executing query', err.stack)
            }
            // console.log(result.rows)
            res.send(result.rows);
            // console.log(data);
        })
    })
});

module.exports = router;