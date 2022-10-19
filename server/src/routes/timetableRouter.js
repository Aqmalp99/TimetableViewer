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



router.get('/teacher/venues', async (req, res) => {
    const query = `SELECT venue.venue_id, venue.room_code, venue.building, venue.capacity FROM venue 
                    WHERE venue_id NOT IN ( SELECT venue.venue_id FROM venue 
                    INNER JOIN class 
                    ON class.venue_id = venue.venue_id 
                    WHERE DATE_PART('dow', to_timestamp($1, 'yyyy-MM-ddTHH:mm:ss.SSSUUU'))::integer = DATE_PART('dow', class.start_date)::integer 
                    AND ((class.end_time >= $2 AND class.end_time <= $3) 
                    OR (class.start_time >= $2 AND class.start_time <= $3))
                    );`;
    
    await req.pool.connect((err, client, release) => {
        if (err) {
            return console.error('Error acquiring client', err.stack)
        }
        client.query(query, [req.query.date, req.query.start_time, req.query.end_time], (err, result) => {
            release();
            if (err) {
                return console.error('Error executing query', err.stack)
            }
            // console.log(result.rows)
            console.log(result.rows);
            res.send(result.rows);
            // console.log(data);
        })
    })
});
router.get('/teacher/:id', async (req, res) => {
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

// const client = await req.pool.connect();
//     const result = await client.query({
//         rowMode: 'array',
//         text: query, 
//         values: [req.params.id]
//     })

//     console.log(result.rows);
//     await client.end();

router.get('/timetable/:id', async (req, res) => {
    const query = `SELECT role, user_id FROM users
                   WHERE uni_id = $1;`;
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

router.post('/admin/update-time', async (req, res) => {
    const query = `UPDATE class SET start_date = $1, start_time = $2, end_time = $3
                    WHERE class_id = $4;`;
    await req.pool.connect((err, client, release) => {
        if (err) {
            return console.error('Error acquiring client', err.stack)
        }
        client.query(query, [req.body.date, req.body.start, req.body.end, req.body.id], (err, result) => {
            release();
            if (err) {
                return console.error('Error executing query', err.stack)
            }
            // console.log(result.rows)
            res.sendStatus(200);
            // console.log(data);
        })
    })
});

module.exports = router;