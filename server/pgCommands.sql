CREATE DATABASE timetable;

CREATE TABLE users 
(username VARCHAR(200) PRIMARY KEY NOT NULL, 
fullname VARCHAR(200) NOT NULL,
email VARCHAR(200) NOT NULL,
password VARCHAR(200) NOT NULL,
role VARCHAR(50) NOT NULL,
notification BOOLEAN NOT NULL,
UNIQUE (email,username));

INSERT INTO users (username, fullname, email, password, role, notification)
VALUES 
('a1802961', 'Vinay Kumar','vinay@gmail.com', '1234', 'student', true);