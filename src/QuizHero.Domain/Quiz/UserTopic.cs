using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Volo.Abp.Domain.Entities.Auditing;
using Volo.Abp.Identity;

namespace QuizHero.Quiz
{
	[Table("UserTopics", Schema = QuizHeroConsts.DbSchema)]
	public class UserTopic : CreationAuditedEntityWithUser<Guid, IdentityUser>
	{
		[Required]
		public virtual Guid TopicId { get; protected set; }

		protected UserTopic()
		{
		}

		public UserTopic(Guid id, Guid topicId)
		{
			Id = id;
			TopicId = topicId;
		}
	}
}