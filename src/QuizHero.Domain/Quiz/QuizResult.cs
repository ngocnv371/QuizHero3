using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Volo.Abp.Domain.Entities.Auditing;
using Volo.Abp.Identity;

namespace QuizHero.Quiz
{
	[Table("QuizResults", Schema = QuizHeroConsts.DbSchema)]
	public class QuizResult : CreationAuditedEntityWithUser<Guid, IdentityUser>
	{
		[Required]
		public virtual int Score { get; protected set; }

		[Required]
		public virtual Guid QuizId { get; protected set; }

		[ForeignKey(nameof(QuizId))]
		public virtual Quiz Quiz { get; protected set; }

		protected QuizResult()
		{
		}

		public QuizResult(Guid id, Guid quizId, int score)
		{
			Id = id;
			QuizId = quizId;
			Score = score;
		}
	}
}