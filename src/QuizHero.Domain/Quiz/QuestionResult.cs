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

		[ForeignKey(nameof(QuestionId))]
		public virtual Question Question { get; protected set; }

		[Required]
		public virtual Guid AnswerId { get; protected set; }

		[ForeignKey(nameof(AnswerId))]
		public virtual Answer Answer { get; protected set; }

		[Required]
		public virtual Guid QuizResultId { get; protected set; }

		[ForeignKey(nameof(QuizResultId))]
		public virtual QuizResult QuizResult { get; protected set; }

		protected QuestionResult()
		{
		}

		public QuestionResult(Guid id, Guid questionId, Guid answerId, Guid quizResultId)
		{
			Id = id;
			QuestionId = questionId;
			AnswerId = answerId;
			QuizResultId = quizResultId;
		}
	}
}