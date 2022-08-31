--
-- PostgreSQL database dump
--

-- Dumped from database version 12.12 (Ubuntu 12.12-0ubuntu0.20.04.1)
-- Dumped by pg_dump version 12.12 (Ubuntu 12.12-0ubuntu0.20.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: pgcrypto; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS pgcrypto WITH SCHEMA public;


--
-- Name: EXTENSION pgcrypto; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION pgcrypto IS 'cryptographic functions';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: class; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.class (
    class_id integer NOT NULL,
    class_code character varying(255),
    class_name character varying(255),
    class_type character varying(255),
    start_date date,
    start_time time without time zone,
    end_time time without time zone,
    capacity smallint,
    venue_id integer
);


ALTER TABLE public.class OWNER TO postgres;

--
-- Name: class_class_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.class_class_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.class_class_id_seq OWNER TO postgres;

--
-- Name: class_class_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.class_class_id_seq OWNED BY public.class.class_id;


--
-- Name: enrolled_classes; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.enrolled_classes (
    enrolment_id integer NOT NULL,
    student_id integer,
    class_id integer
);


ALTER TABLE public.enrolled_classes OWNER TO postgres;

--
-- Name: enrolled_classes_enrolment_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.enrolled_classes_enrolment_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.enrolled_classes_enrolment_id_seq OWNER TO postgres;

--
-- Name: enrolled_classes_enrolment_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.enrolled_classes_enrolment_id_seq OWNED BY public.enrolled_classes.enrolment_id;


--
-- Name: staff_enrolments; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.staff_enrolments (
    enrolment_id integer NOT NULL,
    staff_id integer,
    class_id integer
);


ALTER TABLE public.staff_enrolments OWNER TO postgres;

--
-- Name: staff_enrolments_enrolment_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.staff_enrolments_enrolment_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.staff_enrolments_enrolment_id_seq OWNER TO postgres;

--
-- Name: staff_enrolments_enrolment_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.staff_enrolments_enrolment_id_seq OWNED BY public.staff_enrolments.enrolment_id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    user_id integer NOT NULL,
    email text NOT NULL,
    password text NOT NULL
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: users_user_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_user_id_seq OWNER TO postgres;

--
-- Name: users_user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_user_id_seq OWNED BY public.users.user_id;


--
-- Name: venue; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.venue (
    venue_id integer NOT NULL,
    room_code character varying(255),
    building character varying(255),
    capacity integer
);


ALTER TABLE public.venue OWNER TO postgres;

--
-- Name: venue_venue_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.venue_venue_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.venue_venue_id_seq OWNER TO postgres;

--
-- Name: venue_venue_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.venue_venue_id_seq OWNED BY public.venue.venue_id;


--
-- Name: class class_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.class ALTER COLUMN class_id SET DEFAULT nextval('public.class_class_id_seq'::regclass);


--
-- Name: enrolled_classes enrolment_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.enrolled_classes ALTER COLUMN enrolment_id SET DEFAULT nextval('public.enrolled_classes_enrolment_id_seq'::regclass);


--
-- Name: staff_enrolments enrolment_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.staff_enrolments ALTER COLUMN enrolment_id SET DEFAULT nextval('public.staff_enrolments_enrolment_id_seq'::regclass);


--
-- Name: users user_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN user_id SET DEFAULT nextval('public.users_user_id_seq'::regclass);


--
-- Name: venue venue_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.venue ALTER COLUMN venue_id SET DEFAULT nextval('public.venue_venue_id_seq'::regclass);


--
-- Data for Name: class; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.class (class_id, class_code, class_name, class_type, start_date, start_time, end_time, capacity, venue_id) FROM stdin;
1	COMPSCI 3304	Engineering Software as Services II	Workshop	2022-08-25	09:00:00	11:00:00	50	1
2	COMPSCI 3004	Operating Systems	Workshop	2022-08-24	12:00:00	13:00:00	40	3
3	ENG 3004	Systems Engineering & Industry Practice	Workshop	2022-08-25	12:00:00	14:00:00	50	2
4	COMPSCI 4412	Secure Software Engineering	Lecture	2022-08-22	12:00:00	14:00:00	50	4
\.


--
-- Data for Name: enrolled_classes; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.enrolled_classes (enrolment_id, student_id, class_id) FROM stdin;
\.


--
-- Data for Name: staff_enrolments; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.staff_enrolments (enrolment_id, staff_id, class_id) FROM stdin;
1	1	1
2	1	3
3	1	2
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (user_id, email, password) FROM stdin;
1	johndoe@email.com	$2a$06$BCYfeJmHCqokJQ4AWVjEduXslu89R7/PAs6JpkgcLCtXM35myVkUa
\.


--
-- Data for Name: venue; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.venue (venue_id, room_code, building, capacity) FROM stdin;
1	B17	Ingkarni Wardli	30
2	EM205	Engineering & Mathematics	30
3	218	Ingkarni Wardli	30
4	OL	MyUni	50
\.


--
-- Name: class_class_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.class_class_id_seq', 4, true);


--
-- Name: enrolled_classes_enrolment_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.enrolled_classes_enrolment_id_seq', 1, false);


--
-- Name: staff_enrolments_enrolment_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.staff_enrolments_enrolment_id_seq', 3, true);


--
-- Name: users_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_user_id_seq', 1, true);


--
-- Name: venue_venue_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.venue_venue_id_seq', 4, true);


--
-- Name: class class_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.class
    ADD CONSTRAINT class_pkey PRIMARY KEY (class_id);


--
-- Name: enrolled_classes enrolled_classes_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.enrolled_classes
    ADD CONSTRAINT enrolled_classes_pkey PRIMARY KEY (enrolment_id);


--
-- Name: staff_enrolments staff_enrolments_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.staff_enrolments
    ADD CONSTRAINT staff_enrolments_pkey PRIMARY KEY (enrolment_id);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (user_id);


--
-- Name: venue venue_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.venue
    ADD CONSTRAINT venue_pkey PRIMARY KEY (venue_id);


--
-- Name: class class_venue_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.class
    ADD CONSTRAINT class_venue_id_fkey FOREIGN KEY (venue_id) REFERENCES public.venue(venue_id);


--
-- Name: enrolled_classes enrolled_classes_class_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.enrolled_classes
    ADD CONSTRAINT enrolled_classes_class_id_fkey FOREIGN KEY (class_id) REFERENCES public.class(class_id);


--
-- Name: enrolled_classes enrolled_classes_student_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.enrolled_classes
    ADD CONSTRAINT enrolled_classes_student_id_fkey FOREIGN KEY (student_id) REFERENCES public.users(user_id);


--
-- Name: staff_enrolments staff_enrolments_class_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.staff_enrolments
    ADD CONSTRAINT staff_enrolments_class_id_fkey FOREIGN KEY (class_id) REFERENCES public.class(class_id);


--
-- Name: staff_enrolments staff_enrolments_staff_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.staff_enrolments
    ADD CONSTRAINT staff_enrolments_staff_id_fkey FOREIGN KEY (staff_id) REFERENCES public.users(user_id);


--
-- PostgreSQL database dump complete
--

