using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Volo.Abp.Domain.Entities.Auditing;
using Volo.Abp.Identity;

namespace QuizHero.Quiz
{
	[Table("QuestionResults", Schema = QuizHeroConsts.DbSchema)]
	public class QuestionResult : CreationAuditedEntityWithUser<Guid, IdentityUser>
	{
		[Required]
		public virtual Guid QuestionId { get; protected set; }

		[Required]
		public virtual Guid QuizResultId { get; protected set; }

		public virtual bool IsCorrect { get; protected set; }

		protected QuestionResult()
		{
		}

		public QuestionResult(Guid id, Guid questionId, bool isCorrect, Guid quizResultId)
		{
			Id = id;
			QuestionId = questionId;
			IsCorrect = isCorrect;
			QuizResultId = quizResultId;
		}
	}
}