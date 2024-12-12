using System;
using System.Collections.Generic;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Identity;

namespace QuizHero.Quiz
{
	public class QuestionDto : AuditedEntityWithUserDto<Guid, IdentityUserDto>
	{
		public string Text { get; set; }
		public List<AnswerDto> Answers { get; set; }
	}
}