using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Diagnostics.CodeAnalysis;
using System.Xml.Linq;
using Volo.Abp;
using Volo.Abp.Domain.Entities;

namespace QuizHero.Quiz
{
	[Table("Answers", Schema = QuizHeroConsts.DbSchema)]
	public class Answer : Entity<Guid>
	{
		[Required(AllowEmptyStrings = false)]
		public virtual string Text { get; protected set; }

		[Required]
		public virtual bool IsCorrect { get; protected set; }

		[Required]
		public virtual Guid QuestionId { get; protected set; }

		protected Answer()
		{
		}

		internal Answer(Guid id, Guid questionId, [NotNull] string text, bool isCorrect)
		{
			Check.NotNullOrWhiteSpace(text, nameof(text));
			Id = id;
			QuestionId = questionId;
			Text = text;
			IsCorrect = isCorrect;
		}

		public void ChangeText(string text)
		{
			Text = text;
		}

		public void ChangeIsCorrect(bool isCorrect)
		{
			IsCorrect = isCorrect;
		}
	}
}