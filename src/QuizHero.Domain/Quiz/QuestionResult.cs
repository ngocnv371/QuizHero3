using System;
using Volo.Abp.Domain.Entities.Auditing;
using Volo.Abp.Identity;

namespace QuizHero.Quiz
{
	public class QuestionResult : CreationAuditedEntityWithUser<Guid, IdentityUser>
	{
		public virtual Guid QuestionId { get; protected set; }
		public virtual Question Question { get; protected set; }
		public virtual Guid AnswerId { get; protected set; }
		public virtual Answer Answer { get; protected set; }
		public virtual Guid QuizResultId { get; protected set; }
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