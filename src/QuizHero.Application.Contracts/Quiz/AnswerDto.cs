using System;
using Volo.Abp.Application.Dtos;

namespace QuizHero.Quiz
{
	public class AnswerDto : EntityDto<Guid>
	{
		public string Text { get; set; }
		public bool IsCorrect { get; set; }
	}
}