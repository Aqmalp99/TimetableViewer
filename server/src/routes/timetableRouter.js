const express = require('express');
const router = express.Router();

router.get('/student/:id', async (req, res) => {
    const query = `SELECT class.class_code, class.class_name, class.class_type, class.start_date, class.start_time, class.end_time, venue.room_code, venue.building from enrolled_classes
                   INNER JOIN class
                   ON class.class_id = enrolled_classes.class_id
                   INNER JOIN venue
                   ON class.venue_id = venue.venue_id
                   WHERE enrolled_classes.student_id = $1;`;
    await req.pool.connect((err, client, release) => {
        if (err) {
            return console.error('Error acquiring client', err.stack)
        }
        client.query(query, [req.params.id], (err, result) => {
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

router.get('/staff/:id', async (req, res) => {
    const query = `SELECT class.class_code, class.class_name, class.class_type, class.start_date, class.start_time, class.end_time, venue.room_code, venue.building, venue.capacity from staff_enrolments
                   INNER JOIN class
                   ON class.class_id = staff_enrolments.class_id
                   INNER JOIN venue
                   ON class.venue_id = venue.venue_id
                   WHERE staff_enrolments.staff_id = $1;`;
    await req.pool.connect((err, client, release) => {
        if (err) {
            return console.error('Error acquiring client', err.stack)
        }
        client.query(query, [req.params.id], (err, result) => {
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