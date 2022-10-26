CREATE TABLE enrolled_class (
    enrolment_id SERIAL PRIMARY KEY,
    student_id integer REFERENCES users,
    class_id integer REFERENCES class 
);