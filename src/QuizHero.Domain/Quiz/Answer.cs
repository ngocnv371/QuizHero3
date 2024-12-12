using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Volo.Abp.Domain.Entities;

namespace QuizHero.Quiz
{
	public class Answer : Entity<Guid>
	{
		[Required(AllowEmptyStrings = false)]
		public virtual string Text { get; protected set; }

		[Required]
		public virtual bool IsCorrect { get; protected set; }

		[Required]
		public virtual Guid QuestionId { get; protected set; }

		[ForeignKey(nameof(QuestionId))]
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