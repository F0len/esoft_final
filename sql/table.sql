BEGIN;

CREATE TABLE IF NOT EXISTS public."user"
(
    id uuid NOT NULL,
    name character varying NOT NULL,
    login character varying NOT NULL,
    password character varying NOT NULL,
    telegram character varying,
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public.course
(
    id serial NOT NULL,
    name character varying NOT NULL,
    description character varying,
    date_start date NOT NULL,
    status character varying NOT NULL,
    telegram character varying NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public.role
(
    id smallserial NOT NULL,
    name character varying,
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public.role_user
(
    user_id uuid,
    role_id smallint,
    PRIMARY KEY (user_id, role_id)
);

CREATE TABLE IF NOT EXISTS public.lesson
(
    id serial NOT NULL,
    name character varying NOT NULL,
    description character varying,
    scheduled_date date NOT NULL,
    "time" time with time zone NOT NULL,
    feedback_form json,
    course_id integer NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public.homework
(
    "Id" serial,
    task text NOT NULL,
    deadline date NOT NULL,
    form json,
    course_id integer NOT NULL,
    scheduled_date date NOT NULL,
    name character varying NOT NULL,
    PRIMARY KEY ("Id")
);

CREATE TABLE IF NOT EXISTS public.course_user
(
    user_id uuid,
    course_id integer,
    PRIMARY KEY (user_id, course_id)
);

CREATE TABLE IF NOT EXISTS public.files
(
    id uuid NOT NULL,
    name character varying NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public.lesson_files
(
    lesson_id integer,
    file_id uuid,
    PRIMARY KEY (lesson_id, file_id)
);

CREATE TABLE IF NOT EXISTS public.feedback_response
(
    id serial NOT NULL,
    user_id uuid NOT NULL,
    lession_id integer NOT NULL,
    response json NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public.homework_response
(
    id serial NOT NULL,
    user_id uuid NOT NULL,
    homework_id integer NOT NULL,
    response json NOT NULL,
    PRIMARY KEY (id)
);

ALTER TABLE IF EXISTS public.role_user
    ADD FOREIGN KEY (role_id)
    REFERENCES public.role (id) MATCH SIMPLE
    ON UPDATE CASCADE
    ON DELETE CASCADE
    NOT VALID;

ALTER TABLE IF EXISTS public.role_user
    ADD FOREIGN KEY (user_id)
    REFERENCES public."user" (id) MATCH SIMPLE
    ON UPDATE CASCADE
    ON DELETE CASCADE
    NOT VALID;

ALTER TABLE IF EXISTS public.lesson
    ADD FOREIGN KEY (course_id)
    REFERENCES public.course (id) MATCH SIMPLE
    ON UPDATE CASCADE
    ON DELETE CASCADE
    NOT VALID;

ALTER TABLE IF EXISTS public.homework
    ADD FOREIGN KEY (course_id)
    REFERENCES public.course (id) MATCH SIMPLE
    ON UPDATE CASCADE
    ON DELETE CASCADE
    NOT VALID;

ALTER TABLE IF EXISTS public.course_user
    ADD FOREIGN KEY (user_id)
    REFERENCES public."user" (id) MATCH SIMPLE
    ON UPDATE CASCADE
    ON DELETE CASCADE
    NOT VALID;

ALTER TABLE IF EXISTS public.course_user
    ADD FOREIGN KEY (course_id)
    REFERENCES public.course (id) MATCH SIMPLE
    ON UPDATE CASCADE
    ON DELETE CASCADE
    NOT VALID;

ALTER TABLE IF EXISTS public.lesson_files
    ADD FOREIGN KEY (file_id)
    REFERENCES public.files (id) MATCH SIMPLE
    ON UPDATE CASCADE
    ON DELETE CASCADE
    NOT VALID;

ALTER TABLE IF EXISTS public.lesson_files
    ADD FOREIGN KEY (lesson_id)
    REFERENCES public.lesson (id) MATCH SIMPLE
    ON UPDATE CASCADE
    ON DELETE CASCADE
    NOT VALID;

ALTER TABLE IF EXISTS public.feedback_response
    ADD FOREIGN KEY (user_id)
    REFERENCES public."user" (id) MATCH SIMPLE
    ON UPDATE CASCADE
    ON DELETE CASCADE
    NOT VALID;

ALTER TABLE IF EXISTS public.feedback_response
    ADD FOREIGN KEY (lession_id)
    REFERENCES public.lesson (id) MATCH SIMPLE
    ON UPDATE CASCADE
    ON DELETE CASCADE
    NOT VALID;

ALTER TABLE IF EXISTS public.homework_response
    ADD FOREIGN KEY (user_id)
    REFERENCES public."user" (id) MATCH SIMPLE
    ON UPDATE CASCADE
    ON DELETE CASCADE
    NOT VALID;

ALTER TABLE IF EXISTS public.homework_response
    ADD FOREIGN KEY (homework_id)
    REFERENCES public.homework ("Id") MATCH SIMPLE
    ON UPDATE CASCADE
    ON DELETE CASCADE
    NOT VALID;

END;
