using System;
using System.Collections.Generic;
using Volo.Abp.Domain.Entities.Auditing;
using Volo.Abp.Identity;

namespace QuizHero.Quiz
{
	public class Question : AuditedEntityWithUser<Guid, IdentityUser>
	{
		public Guid QuizId { get; protected set; }
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