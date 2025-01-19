using System;
using System.Collections;
using System.Collections.Generic;
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

		public virtual List<QuestionResult> QuestionResults { get; protected set; } = new();

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