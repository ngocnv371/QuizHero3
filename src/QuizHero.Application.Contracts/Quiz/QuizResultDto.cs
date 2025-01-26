using System;
using System.Collections.Generic;
using System.Linq;
using Volo.Abp.Application.Dtos;

namespace QuizHero.Quiz
{
	public class CreateQuizResultDto
	{
		public Guid QuizId { get; set; }
		public IEnumerable<CreateQuestionResultDto> QuestionResults { get; set; }
	}

	public class CreateQuestionResultDto
	{
		public Guid QuestionId { get; set; }
		public bool IsCorrect { get; set; }
	}

	public class QuizResultDto : EntityDto<Guid>
	{
		public Guid QuizId { get; set; }
		public Guid TopicId { get; set; }
		public DateTime CreationTime { get; set; }
		public string TopicAvatarUrl { get; set; }
		public string Topic { get; set; }
		public string Quiz { get; set; }
		public IEnumerable<QuestionResultDto> QuestionResults { get; set; }
		public int Score => QuestionResults.Count(q => q.IsCorrect);
		public int MaxScore => QuestionResults.Count();
	}

	public class QuestionResultDto : EntityDto<Guid>
	{
		public Guid QuestionId { get; set; }
		public bool IsCorrect { get; set; }
	}

	public class QuizResultQuery : PagedAndSortedResultRequestDto
	{
		public Guid? QuizId { get; set; }
	}
}