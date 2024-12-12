using System;
using System.Collections.Generic;
using Volo.Abp.Application.Dtos;

namespace QuizHero.Quiz
{
	public class QuestionDto : AuditedEntityWithUserDto<Guid>
	{
		public string Text { get; set; }
		public List<AnswerDto> Answers { get; set; }
	}
}