CREATE TABLE venue (
    venue_id SERIAL PRIMARY KEY,
    room_code character varying(255),
    building character varying(255),
    capacity integer
);