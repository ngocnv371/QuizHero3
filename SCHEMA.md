# Schema

The following is the basic schema for our Quiz application. The app allows users to take quizzes. The users then will be ranked on leaderboards based on global scope, `location1` (cities) scope and `location2` (districts) scope. Each topic has separate leaderboards.

A user can take a quiz multiple times. Only the latest attempt is accounted for the leaderboard. Their rannk is determined by the sum of scores they earned across all quizzes under that topic.

# Tables

- Topics (id, name, category)
- Quizzes (id, title, topicId)
- Questions (id, quizid, text)
- Answers (id, questionId, text, isCorrect)
- Users (id, name, location1, location2)
- UserTopics (userId, topicId): represent if this user has added a topic to his favourites list
- QuizResults (quizId, userId, score, date)
- QuestionResults (quizResultId, questionId, isCorrect)
