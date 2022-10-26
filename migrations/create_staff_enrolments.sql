CREATE TABLE staff_enrolments (
    enrolment_id SERIAL PRIMARY KEY,
    staff_id integer REFERENCES users,
    class_id integer REFERENCES class,
);