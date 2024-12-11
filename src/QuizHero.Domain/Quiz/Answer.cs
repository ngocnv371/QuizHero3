using System;
using Volo.Abp.Domain.Entities;

namespace QuizHero.Quiz
{
	public class Answer : Entity<Guid>
	{
		public virtual string Text { get; protected set; }
		public virtual bool IsCorrect { get; protected set; }
		public virtual Guid QuestionId { get; protected set; }
		public virtual Question Question { get; protected set; }

		protected Answer()
		{
		}

		public Answer(Guid id, Guid questionId, string text, bool isCorrect)
		{
			Id = id;
			QuestionId = questionId;
			Text = text;
			IsCorrect = isCorrect;
		}
	}
}