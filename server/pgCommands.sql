CREATE DATABASE timetable;

CREATE TABLE users 
(username VARCHAR(50) PRIMARY KEY NOT NULL, 
fullname VARCHAR(200) NOT NULL,
email VARCHAR(200) NOT NULL,
password VARCHAR(200) NOT NULL,
role VARCHAR(50) NOT NULL,
UNIQUE (email));


