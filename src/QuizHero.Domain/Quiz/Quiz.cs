using System;
using System.Collections.Generic;
using Volo.Abp.Domain.Entities.Auditing;
using Volo.Abp.Identity;

namespace QuizHero.Quiz
{
	public class Quiz : AuditedAggregateRootWithUser<Guid, IdentityUser>
	{
		public virtual string Title { get; protected set; }
		public virtual string Description { get; protected set; }
		public virtual List<Question> Questions { get; protected set; }
		public virtual List<QuizResult> Results { get; protected set; }

		protected Quiz()
		{
			Questions = new List<Question>();
			Results = new List<QuizResult>();
		}

		public Quiz(Guid id, string title, string description)
		{
			Id = id;
			Title = title;
			Description = description;
			Questions = new List<Question>();
			Results = new List<QuizResult>();
		}
	}
}