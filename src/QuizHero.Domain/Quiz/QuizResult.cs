using System;
using Volo.Abp.Domain.Entities.Auditing;
using Volo.Abp.Identity;

namespace QuizHero.Quiz
{
	public class QuizResult : CreationAuditedEntityWithUser<Guid, IdentityUser>
	{
		public virtual int Score { get; protected set; }
		public virtual Guid QuizId { get; protected set; }
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