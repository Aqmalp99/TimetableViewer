CREATE TABLE clash_request (
    clash_id SERIAL PRIMARY KEY,
    user_id integer REFERENCES user,
    date_time TIMESTAMP WITHOUT TIMEZONE,
);