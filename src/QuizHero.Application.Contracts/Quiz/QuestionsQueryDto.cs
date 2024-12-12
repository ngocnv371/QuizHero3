using System;
using Volo.Abp.Application.Dtos;

namespace QuizHero.Quiz
{
	public class QuestionsQueryDto : PagedAndSortedResultRequestDto
	{
		public Guid? QuizId { get; set; }
	}
}