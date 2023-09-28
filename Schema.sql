--
-- PostgreSQL database dump
--

-- Dumped from database version 16.0
-- Dumped by pg_dump version 16.0

-- Started on 2023-09-28 14:44:08

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
-- TOC entry 2 (class 3079 OID 16384)
-- Name: adminpack; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS adminpack WITH SCHEMA pg_catalog;


--
-- TOC entry 4788 (class 0 OID 0)
-- Dependencies: 2
-- Name: EXTENSION adminpack; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION adminpack IS 'administrative functions for PostgreSQL';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 216 (class 1259 OID 16398)
-- Name: Tasks; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Tasks" (
    task_id integer NOT NULL,
    task text NOT NULL,
    completed boolean DEFAULT false NOT NULL
);


ALTER TABLE public."Tasks" OWNER TO postgres;

--
-- TOC entry 217 (class 1259 OID 16406)
-- Name: Tasks_task_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public."Tasks" ALTER COLUMN task_id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."Tasks_task_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 4781 (class 0 OID 16398)
-- Dependencies: 216
-- Data for Name: Tasks; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Tasks" (task_id, task, completed) FROM stdin;
\.


--
-- TOC entry 4789 (class 0 OID 0)
-- Dependencies: 217
-- Name: Tasks_task_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Tasks_task_id_seq"', 34, true);


--
-- TOC entry 4637 (class 2606 OID 16405)
-- Name: Tasks Tasks_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Tasks"
    ADD CONSTRAINT "Tasks_pkey" PRIMARY KEY (task_id);


-- Completed on 2023-09-28 14:44:08

--
-- PostgreSQL database dump complete
--

