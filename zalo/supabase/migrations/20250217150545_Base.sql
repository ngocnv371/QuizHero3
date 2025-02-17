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

CREATE EXTENSION IF NOT EXISTS "pgsodium" WITH SCHEMA "pgsodium";

COMMENT ON SCHEMA "public" IS 'standard public schema';

CREATE EXTENSION IF NOT EXISTS "pg_graphql" WITH SCHEMA "graphql";

CREATE EXTENSION IF NOT EXISTS "pg_stat_statements" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "pgcrypto" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "pgjwt" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "supabase_vault" WITH SCHEMA "vault";

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA "extensions";

CREATE OR REPLACE FUNCTION "public"."get_history"() RETURNS "record"
    LANGUAGE "plpgsql" STABLE
    AS $$BEGIN
  RETURN(SELECT *
  FROM quiz_results
  WHERE user_id = (auth.uid())
  );
END;$$;

ALTER FUNCTION "public"."get_history"() OWNER TO "postgres";

CREATE OR REPLACE FUNCTION "public"."get_leaderboard_by_topic"("topic_id_param" integer) RETURNS TABLE("id" "uuid", "name" character varying, "avatar_url" character varying, "score" bigint)
    LANGUAGE "plpgsql"
    AS $$
begin
  return query
  select u.id, u.name, u.avatar_url, max(r.score) as score
  from
  quiz_results r
  join profiles u on u.id = r.user_id
  join quizzes q on q.id = r.quiz_id
  where q.topic_id = topic_id_param
  group by u.id, u.name, u.avatar_url
  order by score desc
  limit 10;
end;
$$;

ALTER FUNCTION "public"."get_leaderboard_by_topic"("topic_id_param" integer) OWNER TO "postgres";

CREATE OR REPLACE FUNCTION "public"."get_quiz_results_by_user"() RETURNS TABLE("topic_id" bigint, "topic_name" character varying, "logo_url" "text", "quiz_name" character varying, "id" bigint, "quiz_id" bigint, "user_id" "uuid", "score" bigint, "created_at" timestamp with time zone, "max_score" bigint)
    LANGUAGE "plpgsql"
    AS $$
begin
    return query
    select q.topic_id, t.name as topic_name, t.logo_url, q.name as quiz_name, 
      qr.id, qr.quiz_id, qr.user_id, qr.score, qr.created_at, 
      (select count(*) from questions r where r.quiz_id = qr.quiz_id) as max_score
    from quiz_results qr
    join quizzes q on q.id = qr.quiz_id
    join topics t on q.topic_id = t.id
    where qr.user_id = (select auth.uid());
end;
$$;

ALTER FUNCTION "public"."get_quiz_results_by_user"() OWNER TO "postgres";

CREATE OR REPLACE FUNCTION "public"."create_user_profile"() RETURNS "trigger"
    LANGUAGE "plpgsql" SECURITY DEFINER
    SET "search_path" TO ''
    AS $$
begin
  insert into public.profiles (id, name, zalo_id, avatar_url)
  values (
    new.id, new.raw_user_meta_data ->> 'name', 
    new.raw_user_meta_data ->> 'zalo_id', 
    new.raw_user_meta_data ->> 'avatar_url'
  );
  return new;
end;
$$;

ALTER FUNCTION "public"."create_user_profile"() OWNER TO "postgres";

-- trigger the function every time a user is created
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.create_user_profile();

SET default_tablespace = '';

SET default_table_access_method = "heap";

CREATE TABLE IF NOT EXISTS "public"."answers" (
    "id" bigint NOT NULL,
    "question_id" bigint NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "text" character varying NOT NULL,
    "is_correct" boolean NOT NULL
);

ALTER TABLE "public"."answers" OWNER TO "postgres";

ALTER TABLE "public"."answers" ALTER COLUMN "id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME "public"."answers_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);

CREATE TABLE IF NOT EXISTS "public"."locations" (
    "id" character varying NOT NULL,
    "name" character varying,
    "parent_id" character varying
);

ALTER TABLE "public"."locations" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."profiles" (
    "id" "uuid" NOT NULL,
    "name" character varying NOT NULL,
    "avatar_url" character varying NOT NULL,
    "zalo_id" character varying NOT NULL,
    "location1" character varying,
    "location2" character varying
);

ALTER TABLE "public"."profiles" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."question_results" (
    "id" bigint NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "question_id" bigint NOT NULL,
    "quiz_result_id" bigint NOT NULL,
    "is_correct" boolean NOT NULL
);

ALTER TABLE "public"."question_results" OWNER TO "postgres";

ALTER TABLE "public"."question_results" ALTER COLUMN "id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME "public"."question_results_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);

CREATE TABLE IF NOT EXISTS "public"."questions" (
    "id" bigint NOT NULL,
    "quiz_id" bigint NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "text" "text" NOT NULL
);

ALTER TABLE "public"."questions" OWNER TO "postgres";

ALTER TABLE "public"."questions" ALTER COLUMN "id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME "public"."questions_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);

CREATE TABLE IF NOT EXISTS "public"."quiz_results" (
    "id" bigint NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "quiz_id" bigint NOT NULL,
    "user_id" "uuid" DEFAULT "auth"."uid"() NOT NULL,
    "score" bigint NOT NULL
);

ALTER TABLE "public"."quiz_results" OWNER TO "postgres";

ALTER TABLE "public"."quiz_results" ALTER COLUMN "id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME "public"."quiz_results_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);

CREATE TABLE IF NOT EXISTS "public"."quizzes" (
    "id" bigint NOT NULL,
    "topic_id" bigint NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "name" character varying NOT NULL,
    "description" character varying
);

ALTER TABLE "public"."quizzes" OWNER TO "postgres";

COMMENT ON TABLE "public"."quizzes" IS 'group of questions';

ALTER TABLE "public"."quizzes" ALTER COLUMN "id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME "public"."quizzes_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);

CREATE TABLE IF NOT EXISTS "public"."topics" (
    "id" bigint NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "name" character varying NOT NULL,
    "description" character varying,
    "category" "text" DEFAULT ''::"text" NOT NULL,
    "logo_url" "text" DEFAULT ''::"text",
    "cover_url" "text" DEFAULT ''::"text"
);

ALTER TABLE "public"."topics" OWNER TO "postgres";

COMMENT ON TABLE "public"."topics" IS 'logical units for organizing quizzes';

ALTER TABLE "public"."topics" ALTER COLUMN "id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME "public"."topics_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);

CREATE TABLE IF NOT EXISTS "public"."user_topics" (
    "topic_id" bigint NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "user_id" "uuid" DEFAULT "auth"."uid"() NOT NULL
);

ALTER TABLE "public"."user_topics" OWNER TO "postgres";

COMMENT ON TABLE "public"."user_topics" IS 'keep track of favourite topics';

ALTER TABLE "public"."user_topics" ALTER COLUMN "topic_id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME "public"."user_topics_topic_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);

ALTER TABLE ONLY "public"."answers"
    ADD CONSTRAINT "answers_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."locations"
    ADD CONSTRAINT "locations_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."profiles"
    ADD CONSTRAINT "profiles_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."question_results"
    ADD CONSTRAINT "question_results_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."questions"
    ADD CONSTRAINT "questions_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."quiz_results"
    ADD CONSTRAINT "quiz_results_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."quizzes"
    ADD CONSTRAINT "quizzes_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."topics"
    ADD CONSTRAINT "topics_name_key" UNIQUE ("name");

ALTER TABLE ONLY "public"."topics"
    ADD CONSTRAINT "topics_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."user_topics"
    ADD CONSTRAINT "user_topics_pkey" PRIMARY KEY ("topic_id", "user_id");

ALTER TABLE ONLY "public"."answers"
    ADD CONSTRAINT "answers_question_id_fkey" FOREIGN KEY ("question_id") REFERENCES "public"."questions"("id") ON UPDATE CASCADE ON DELETE RESTRICT;

ALTER TABLE ONLY "public"."profiles"
    ADD CONSTRAINT "profiles_id_fkey" FOREIGN KEY ("id") REFERENCES "auth"."users"("id") ON DELETE CASCADE;

ALTER TABLE ONLY "public"."question_results"
    ADD CONSTRAINT "question_results_question_id_fkey" FOREIGN KEY ("question_id") REFERENCES "public"."questions"("id");

ALTER TABLE ONLY "public"."question_results"
    ADD CONSTRAINT "question_results_quiz_result_id_fkey" FOREIGN KEY ("quiz_result_id") REFERENCES "public"."quiz_results"("id") ON UPDATE RESTRICT ON DELETE RESTRICT;

ALTER TABLE ONLY "public"."questions"
    ADD CONSTRAINT "questions_quiz_id_fkey" FOREIGN KEY ("quiz_id") REFERENCES "public"."quizzes"("id") ON UPDATE CASCADE ON DELETE RESTRICT;

ALTER TABLE ONLY "public"."quiz_results"
    ADD CONSTRAINT "quiz_results_quiz_id_fkey" FOREIGN KEY ("quiz_id") REFERENCES "public"."quizzes"("id") ON UPDATE RESTRICT ON DELETE RESTRICT;

ALTER TABLE ONLY "public"."quiz_results"
    ADD CONSTRAINT "quiz_results_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id") ON UPDATE RESTRICT ON DELETE RESTRICT;

ALTER TABLE ONLY "public"."quizzes"
    ADD CONSTRAINT "quizzes_topic_id_fkey" FOREIGN KEY ("topic_id") REFERENCES "public"."topics"("id") ON UPDATE CASCADE ON DELETE RESTRICT;

ALTER TABLE ONLY "public"."user_topics"
    ADD CONSTRAINT "user_topics_topic_id_fkey" FOREIGN KEY ("topic_id") REFERENCES "public"."topics"("id") ON UPDATE RESTRICT ON DELETE RESTRICT;

ALTER TABLE ONLY "public"."user_topics"
    ADD CONSTRAINT "user_topics_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id") ON UPDATE RESTRICT ON DELETE RESTRICT;

CREATE POLICY "Enable delete for users based on user_id" ON "public"."user_topics" FOR DELETE TO "authenticated" USING ((( SELECT "auth"."uid"() AS "uid") = "user_id"));

CREATE POLICY "Enable insert for users based on user_id" ON "public"."profiles" FOR UPDATE TO "authenticated" USING ((( SELECT "auth"."uid"() AS "uid") = "id"));

CREATE POLICY "Enable insert for users based on user_id" ON "public"."question_results" FOR INSERT TO "authenticated" WITH CHECK ((( SELECT "auth"."uid"() AS "uid") IN ( SELECT "quiz_results"."user_id"
   FROM "public"."quiz_results"
  WHERE ("question_results"."quiz_result_id" = "quiz_results"."id"))));

CREATE POLICY "Enable insert for users based on user_id" ON "public"."quiz_results" FOR INSERT TO "authenticated" WITH CHECK ((( SELECT "auth"."uid"() AS "uid") = "user_id"));

CREATE POLICY "Enable insert for users based on user_id" ON "public"."user_topics" FOR INSERT TO "authenticated" WITH CHECK ((( SELECT "auth"."uid"() AS "uid") = "user_id"));

CREATE POLICY "Enable read access for all users" ON "public"."answers" FOR SELECT USING (true);

CREATE POLICY "Enable read access for all users" ON "public"."locations" FOR SELECT USING (true);

CREATE POLICY "Enable read access for all users" ON "public"."profiles" FOR SELECT TO "authenticated" USING (true);

CREATE POLICY "Enable read access for all users" ON "public"."question_results" FOR SELECT TO "authenticated" USING (true);

CREATE POLICY "Enable read access for all users" ON "public"."questions" FOR SELECT USING (true);

CREATE POLICY "Enable read access for all users" ON "public"."quiz_results" FOR SELECT USING (true);

CREATE POLICY "Enable read access for all users" ON "public"."quizzes" FOR SELECT USING (true);

CREATE POLICY "Enable read access for all users" ON "public"."topics" FOR SELECT USING (true);

CREATE POLICY "Enable users to view their own data only" ON "public"."user_topics" FOR SELECT TO "authenticated" USING ((( SELECT "auth"."uid"() AS "uid") = "user_id"));

ALTER TABLE "public"."answers" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."locations" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."profiles" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."question_results" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."questions" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."quiz_results" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."quizzes" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."topics" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."user_topics" ENABLE ROW LEVEL SECURITY;

ALTER PUBLICATION "supabase_realtime" OWNER TO "postgres";

GRANT USAGE ON SCHEMA "public" TO "postgres";
GRANT USAGE ON SCHEMA "public" TO "anon";
GRANT USAGE ON SCHEMA "public" TO "authenticated";
GRANT USAGE ON SCHEMA "public" TO "service_role";

GRANT ALL ON FUNCTION "public"."get_history"() TO "anon";
GRANT ALL ON FUNCTION "public"."get_history"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."get_history"() TO "service_role";

GRANT ALL ON FUNCTION "public"."get_leaderboard_by_topic"("topic_id_param" integer) TO "anon";
GRANT ALL ON FUNCTION "public"."get_leaderboard_by_topic"("topic_id_param" integer) TO "authenticated";
GRANT ALL ON FUNCTION "public"."get_leaderboard_by_topic"("topic_id_param" integer) TO "service_role";

GRANT ALL ON FUNCTION "public"."get_quiz_results_by_user"() TO "anon";
GRANT ALL ON FUNCTION "public"."get_quiz_results_by_user"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."get_quiz_results_by_user"() TO "service_role";

GRANT ALL ON FUNCTION "public"."create_user_profile"() TO "anon";
GRANT ALL ON FUNCTION "public"."create_user_profile"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."create_user_profile"() TO "service_role";

GRANT ALL ON TABLE "public"."answers" TO "anon";
GRANT ALL ON TABLE "public"."answers" TO "authenticated";
GRANT ALL ON TABLE "public"."answers" TO "service_role";

GRANT ALL ON SEQUENCE "public"."answers_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."answers_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."answers_id_seq" TO "service_role";

GRANT ALL ON TABLE "public"."locations" TO "anon";
GRANT ALL ON TABLE "public"."locations" TO "authenticated";
GRANT ALL ON TABLE "public"."locations" TO "service_role";

GRANT ALL ON TABLE "public"."profiles" TO "anon";
GRANT ALL ON TABLE "public"."profiles" TO "authenticated";
GRANT ALL ON TABLE "public"."profiles" TO "service_role";

GRANT ALL ON TABLE "public"."question_results" TO "anon";
GRANT ALL ON TABLE "public"."question_results" TO "authenticated";
GRANT ALL ON TABLE "public"."question_results" TO "service_role";

GRANT ALL ON SEQUENCE "public"."question_results_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."question_results_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."question_results_id_seq" TO "service_role";

GRANT ALL ON TABLE "public"."questions" TO "anon";
GRANT ALL ON TABLE "public"."questions" TO "authenticated";
GRANT ALL ON TABLE "public"."questions" TO "service_role";

GRANT ALL ON SEQUENCE "public"."questions_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."questions_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."questions_id_seq" TO "service_role";

GRANT ALL ON TABLE "public"."quiz_results" TO "anon";
GRANT ALL ON TABLE "public"."quiz_results" TO "authenticated";
GRANT ALL ON TABLE "public"."quiz_results" TO "service_role";

GRANT ALL ON SEQUENCE "public"."quiz_results_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."quiz_results_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."quiz_results_id_seq" TO "service_role";

GRANT ALL ON TABLE "public"."quizzes" TO "anon";
GRANT ALL ON TABLE "public"."quizzes" TO "authenticated";
GRANT ALL ON TABLE "public"."quizzes" TO "service_role";

GRANT ALL ON SEQUENCE "public"."quizzes_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."quizzes_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."quizzes_id_seq" TO "service_role";

GRANT ALL ON TABLE "public"."topics" TO "anon";
GRANT ALL ON TABLE "public"."topics" TO "authenticated";
GRANT ALL ON TABLE "public"."topics" TO "service_role";

GRANT ALL ON SEQUENCE "public"."topics_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."topics_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."topics_id_seq" TO "service_role";

GRANT ALL ON TABLE "public"."user_topics" TO "anon";
GRANT ALL ON TABLE "public"."user_topics" TO "authenticated";
GRANT ALL ON TABLE "public"."user_topics" TO "service_role";

GRANT ALL ON SEQUENCE "public"."user_topics_topic_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."user_topics_topic_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."user_topics_topic_id_seq" TO "service_role";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "service_role";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "service_role";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "service_role";

RESET ALL;
