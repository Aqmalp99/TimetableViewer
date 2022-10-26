CREATE TABLE notification (
    notification_id SERIAL PRIMARY KEY,
    user_id integer REFERENCES user,
    type varchar(255),
);