set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.get_quiz_results_by_user()
 RETURNS TABLE(
  topic_id bigint, topic_name character varying, logo_url text, 
  quiz_name character varying, id bigint, quiz_id bigint, user_id uuid, 
  score bigint, created_at timestamp with time zone, max_score bigint
  )
 LANGUAGE plpgsql
AS $function$
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
$function$
;

