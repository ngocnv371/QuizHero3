using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace QuizHero.Quiz
{
	public class CreateUpdateQuestionDto
	{
		[Required]
		public Guid QuizId { get; set; }

		public string Text { get; set; }
		public IEnumerable<CreateUpdateAnswerDto> Answers { get; set; }
	}
}