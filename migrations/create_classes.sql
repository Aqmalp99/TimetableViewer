CREATE TABLE class (
    class_id SERIAL PRIMARY KEY,
    class_code character varying(255),
    class_name character varying(255),
    class_type character varying(255),
    start_date date,
    start_time time without time zone,
    end_time time without time zone,
    capacity smallint,
    venue_id integer,
    class_size smallint,
    recurring_factor smallint
);