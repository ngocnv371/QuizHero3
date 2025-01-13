using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Diagnostics.CodeAnalysis;
using Volo.Abp;
using Volo.Abp.Domain.Entities.Auditing;
using Volo.Abp.Identity;

namespace QuizHero.Quiz
{
	[Table("Quizzes", Schema = QuizHeroConsts.DbSchema)]
	public class Quiz : AuditedEntityWithUser<Guid, IdentityUser>
	{
		[Required]
		public virtual Guid TopicId { get; protected set; }

		[ForeignKey(nameof(TopicId))]
		public virtual Topic Topic { get; protected set; }

		[Required(AllowEmptyStrings = false)]
		[StringLength(256)]
		public virtual string Title { get; protected set; } = default!;

		public virtual string Description { get; protected set; } = default!;

		protected Quiz()
		{
		}

		public Quiz(Guid id, Guid topicId, [NotNull] string title, string description)
		{
			Check.NotNullOrWhiteSpace(title, nameof(title));
			Id = id;
			TopicId = topicId;
			Title = title;
			Description = description;
		}
	}
}