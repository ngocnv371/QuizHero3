using System;
using System.Collections.Generic;
using Volo.Abp.Application.Dtos;

namespace QuizHero.Quiz
{
	public class QuizDto : AuditedEntityWithUserDto<Guid>
	{
		public string Title { get; set; }
		public string Description { get; set; }
		public List<QuestionDto> Questions { get; set; }
	}
}