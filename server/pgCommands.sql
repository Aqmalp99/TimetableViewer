CREATE DATABASE timetable;

CREATE TABLE users 
<<<<<<< HEAD
(username VARCHAR(200) PRIMARY KEY NOT NULL, 
=======
(username VARCHAR(50) PRIMARY KEY NOT NULL, 
>>>>>>> origin/main
fullname VARCHAR(200) NOT NULL,
email VARCHAR(200) NOT NULL,
password VARCHAR(200) NOT NULL,
role VARCHAR(50) NOT NULL,
<<<<<<< HEAD
notification BOOLEAN NOT NULL,
UNIQUE (email,username));

INSERT INTO users (username, fullname, email, password, role, notification)
VALUES 
('a1802961', 'Vinay Kumar','vinay@gmail.com', '1234', 'student', true);
=======
UNIQUE (email));


>>>>>>> origin/main
