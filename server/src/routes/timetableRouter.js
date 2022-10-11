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
    const query = `SELECT class.class_code, class.class_size, class.class_id, class.class_name, class.class_type, class.start_date, class.start_time, class.end_time, venue.room_code, venue.building, venue.capacity from staff_enrolments
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

router.get('/staff/:id/alternate_venue', async (req, res) => {
    const query = `SELECT venue.venue_id, venue.room_code, venue.building, venue.capacity FROM venue
                    INNER JOIN class
                    ON class.venue_id = venue.venue_id
                    WHERE
                    mod(DATEDIFF(day, class.start_date, startedDateForSelected),7) =0
                    AND class.end_time <= startTimeForSelected
                    AND class.start_time >=endTimeForSelected;`;
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


// const client = await req.pool.connect();
//     const result = await client.query({
//         rowMode: 'array',
//         text: query, 
//         values: [req.params.id]
//     })

//     console.log(result.rows);
//     await client.end();

module.exports = router;