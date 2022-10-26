const express = require('express');
const router = express.Router();

router.get('/student/:id', async (req, res) => {
    const query = `SELECT users.clash_resolved, class.class_id, class.class_code, class.class_name, class.class_type, class.start_date, class.start_time, class.end_time, class.recurring_factor, venue.room_code, venue.building, venue.capacity from enrolled_classes
                   INNER JOIN class
                   ON class.class_id = enrolled_classes.class_id
                   INNER JOIN venue
                   ON class.venue_id = venue.venue_id
                   INNER join users
                   ON enrolled_classes.student_id = users.user_id
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
router.post('/admin/create-class', async (req, res) => {
    let query = `INSERT INTO class (class_code, class_name, class_type, start_date, start_time, end_time, capacity, venue_id, class_size)
                    VALUES ($1,$2,$3,$4, $5, $6, 50, $7, 0) RETURNING class_id;`;
    console.log(req.body);
    let data='';
    await req.pool.connect((err, client, release) => {
        if (err) {
            return console.error('Error acquiring client', err.stack)
        }
        client.query(query, [req.body.class_code, req.body.class_name, req.body.class_type, req.body.date, req.body.start, req.body.end, req.body.venue_id], (err, result) => {
            release();
            if (err) {
                return console.error('Error executing query', err.stack)
            }
            // console.log(result.rows)
            data=result.rows;
            // console.log(data);
        })
    })

    query = `INSERT INTO staff_enrolments (staff_id, class_id)
                VALUES ($1,$2)`;
    await req.pool.connect((err, client, release) => {
        if (err) {
            return console.error('Error acquiring client', err.stack)
        }
        client.query(query, [req.body.staff_id, data[0].class_id], (err, result) => {
            release();
            if (err) {
                return console.error('Error executing query', err.stack)
            }
            // console.log(result.rows)
            res.send(data);
            console.log(data);
        })
    })
});

router.get('/classes', async (req, res) => {
    const query = `SELECT class.class_id, class.class_code, class.class_name, class.class_type, class.start_date, class.start_time, class.end_time, venue.room_code, venue.building from class
                   INNER JOIN venue
                   ON class.venue_id = venue.venue_id
                   WHERE class_id NOT IN 
                   (SELECT class_id from enrolled_classes 
                    WHERE student_id=$1);`;
    
    await req.pool.connect((err, client, release) => {
        if (err) {
            return console.error('Error acquiring client', err.stack)
        }
        client.query(query, [req.query.id], (err, result) => {
            release();
            if (err) {
                return console.error('Error executing query', err.stack)
            }
            
            res.send(result.rows);
            // console.log(data);
        })
    })
});

router.get('/admin/clashes', async (req, res) => {
    const query = `SELECT users.uni_id, clash_request.date_time FROM users
                    INNER JOIN clash_request
                    ON users.user_id = clash_request.user_id
                    ORDER BY clash_request.date_time DESC;`;
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

router.post('/student/enrol', async (req, res) => {
    const query = `INSERT INTO enrolled_classes (student_id, class_id)
                    VALUES ($1,$2);`;
    await req.pool.connect((err, client, release) => {
        if (err) {
            return console.error('Error acquiring client', err.stack)
        }
        client.query(query, [req.body.user_id, req.body.class_id], (err, result) => {
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

router.post('/admin/de-enrol', async (req, res) => {
    const query = `DELETE FROM enrolled_classes WHERE 
                    student_id = $1 AND class_id = $2;`;
    await req.pool.connect((err, client, release) => {
        if (err) {
            return console.error('Error acquiring client', err.stack)
        }
        client.query(query, [req.body.user_id, req.body.class_id], (err, result) => {
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

router.get('/admin/alternate-classes', async (req, res) => {
    const query = `SELECT class.class_id, class.class_code, class.class_name, class.class_type, class.start_date, class.start_time, class.end_time, venue.room_code, venue.building from class
                    INNER JOIN venue
                    ON venue.venue_id = class.venue_id
                    WHERE class.class_code = $1
                    AND class.class_type = $2
                    AND class.class_id != $3;`;
    await req.pool.connect((err, client, release) => {
        if (err) {
            return console.error('Error acquiring client', err.stack)
        }
        client.query(query, [req.query.class_code, req.query.class_type, req.query.class_id], (err, result) => {
            release();
            if (err) {
                return console.error('Error executing query', err.stack)
            }
            res.send(result.rows);
          
            // console.log(data);
        })
    })
});

router.post('/admin/update-venue', async (req, res) => {
    const query = `UPDATE class SET venue_id = $1
                    WHERE class_id = $2;`;
    await req.pool.connect((err, client, release) => {
        if (err) {
            return console.error('Error acquiring client', err.stack)
        }
        client.query(query, [req.body.venue_id, req.body.class_id], (err, result) => {
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

router.post('/admin/change-class', async (req, res) => {
    let query = `INSERT INTO enrolled_classes (student_id, class_id)
                    VALUES ($1,$2);`;
    await req.pool.connect((err, client, release) => {
        if (err) {
            return console.error('Error acquiring client', err.stack)
        }
        client.query(query, [req.body.user_id, req.body.newClass_id], (err, result) => {
            release();
            if (err) {
                return console.error('Error executing query', err.stack)
            }
            // console.log(result.rows)
            // console.log(data);
        })
    })
    query = `DELETE FROM enrolled_classes WHERE 
            student_id = $1 AND class_id = $2;`;
    await req.pool.connect((err, client, release) => {
        if (err) {
            return console.error('Error acquiring client', err.stack)
        }
        client.query(query, [req.body.user_id, req.body.class_id], (err, result) => {
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

router.get('/notifications', async (req, res) => {

    const query = `SELECT notification_id, type FROM notification WHERE user_id = $1;`;
    await req.pool.connect((err, client, release) => {
        if (err) {
            return console.error('Error acquiring client', err.stack)
        }
        client.query(query, [req.query.id], (err, result) => {
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

router.post('/notification/delete', async (req, res) => {
    const deleteQuery = `DELETE FROM notification WHERE notification_id = $1;`;

    await req.pool.connect((err, client, release) => {
        if (err) {
            return console.error('Error acquiring client', err.stack)
        }
        client.query(deleteQuery, [req.body.id], (err, result) => {
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