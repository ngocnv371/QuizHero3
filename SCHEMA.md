# Schema

The following is the basic schema for our Quiz application. The app allows users to take quizzes. The users then will be ranked on leaderboards based on global scope, `location1` (cities) scope and `location2` (districts) scope. Each topic has separate leaderboards.

A user can take a quiz multiple times. Only the latest attempt is accounted for the leaderboard. Their rannk is determined by the sum of scores they earned across all quizzes under that topic.

# Tables

- Topics (id, name, category, logo_url, cover_url)
- Quizzes (id, title, topicId)
- Questions (id, quizid, text)
- Answers (id, questionId, text, isCorrect)
- Profiles (id, name, avatar_url, zalo_id, location1, location2)
- UserTopics (userId, topicId): represent if this user has added a topic to his favourites list
- QuizResults (quizId, userId, score, date)
- QuestionResults (quizResultId, questionId, isCorrect)

# Why did we gave up on Supabase?

- Could not conveniently integrate with Zalo Auth since Supabase has its own Auth and only support email + phone + OAuth, while Zalo provided an encrypted `access_token` already.
- We could do a `signIn` with a hardcoded password, but that's basically no security at all.
- Maybe that's not so bad?
    - The identity of users are not that critical
    - Well, it is to the users

# Consider AppWrite.io

- The server SDK allows generate token for a specific user
- So we could
    - Resolve the Zalo user from token
    - Create user
    - Generate token
- This is seamless
