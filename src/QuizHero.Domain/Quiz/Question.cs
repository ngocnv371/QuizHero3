using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Volo.Abp.Domain.Entities.Auditing;
using Volo.Abp.Identity;

namespace QuizHero.Quiz
{
	public class Question : AuditedEntityWithUser<Guid, IdentityUser>
	{
		[Required]
		public Guid QuizId { get; protected set; }

		[ForeignKey(nameof(QuizId))]
		public virtual Quiz Quiz { get; protected set; }

		[Required(AllowEmptyStrings = false)]
		public virtual string Text { get; protected set; }

		public virtual List<Answer> Answers { get; protected set; }

		protected Question()
		{
			Answers = new List<Answer>();
		}

		public Question(Guid id, Guid quizId, string text)
		{
			Id = id;
			QuizId = quizId;
			Text = text;
			Answers = new List<Answer>();
		}
	}
}