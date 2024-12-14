using System;
using Volo.Abp.Application.Dtos;

namespace QuizHero.Quiz
{
	public class QuizzesQueryDto : PagedAndSortedResultRequestDto
	{
		public Guid? TopicId { get; set; }
	}
}