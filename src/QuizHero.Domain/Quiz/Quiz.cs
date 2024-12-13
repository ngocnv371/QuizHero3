using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Volo.Abp.Domain.Entities.Auditing;
using Volo.Abp.Identity;

namespace QuizHero.Quiz
{
	[Table("Quizzes", Schema = QuizHeroConsts.DbSchema)]
	public class Quiz : AuditedAggregateRootWithUser<Guid, IdentityUser>
	{
		[Required]
		public virtual Guid TopicId { get; protected set; }

		[ForeignKey(nameof(TopicId))]
		public virtual Topic Topic { get; protected set; }

		[Required(AllowEmptyStrings = false)]
		[StringLength(256)]
		public virtual string Title { get; protected set; }

		public virtual string Description { get; protected set; }
		public virtual List<Question> Questions { get; protected set; }
		public virtual List<QuizResult> Results { get; protected set; }

		protected Quiz()
		{
			Questions = new List<Question>();
			Results = new List<QuizResult>();
		}

		public Quiz(Guid id, Guid topicId, string title, string description)
		{
			Id = id;
			TopicId = topicId;
			Title = title;
			Description = description;
			Questions = new List<Question>();
			Results = new List<QuizResult>();
		}
	}
}