--
-- PostgreSQL database dump
--

-- Dumped from database version 16.3 (Homebrew)
-- Dumped by pg_dump version 16.3 (Homebrew)

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
-- Name: api; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA api;


ALTER SCHEMA api OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: todos; Type: TABLE; Schema: api; Owner: postgres
--

CREATE TABLE api.todos (
    id integer NOT NULL,
    done boolean DEFAULT false NOT NULL,
    task text NOT NULL,
    due timestamp with time zone
);


ALTER TABLE api.todos OWNER TO postgres;

--
-- Name: todos_id_seq; Type: SEQUENCE; Schema: api; Owner: postgres
--

ALTER TABLE api.todos ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME api.todos_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Data for Name: todos; Type: TABLE DATA; Schema: api; Owner: postgres
--

COPY api.todos (id, done, task, due) FROM stdin;
230	f	sdddd	\N
231	f	ssssss	\N
232	f	aaaaaa	\N
233	f	ssssss	\N
\.


--
-- Name: todos_id_seq; Type: SEQUENCE SET; Schema: api; Owner: postgres
--

SELECT pg_catalog.setval('api.todos_id_seq', 233, true);


--
-- Name: todos todos_pkey; Type: CONSTRAINT; Schema: api; Owner: postgres
--

ALTER TABLE ONLY api.todos
    ADD CONSTRAINT todos_pkey PRIMARY KEY (id);


--
-- Name: SCHEMA api; Type: ACL; Schema: -; Owner: postgres
--

GRANT USAGE ON SCHEMA api TO web_anon;
GRANT USAGE ON SCHEMA api TO todo_user;


--
-- Name: TABLE todos; Type: ACL; Schema: api; Owner: postgres
--

GRANT SELECT ON TABLE api.todos TO web_anon;
GRANT ALL ON TABLE api.todos TO todo_user;


--
-- PostgreSQL database dump complete
--

