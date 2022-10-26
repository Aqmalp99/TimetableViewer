CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    username varchar(255),
    password varchar(255),
    role varchar(255),
    notification varchar(255),
    uni_id varchar(255),
    clash_resolved varchar(255),
    first_name varchar(255),
    surname varchar(255)
);