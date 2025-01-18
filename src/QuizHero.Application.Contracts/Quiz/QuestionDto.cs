using System;
using System.Collections.Generic;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Identity;

namespace QuizHero.Quiz
{
	public class QuestionDto : EntityDto<Guid>
	{
		public Guid QuizId { get; set; }
		public string QuizTitle { get; set; } = default!;
		public string Text { get; set; } = default!;
		public List<AnswerDto> Answers { get; set; } = [];
	}
}