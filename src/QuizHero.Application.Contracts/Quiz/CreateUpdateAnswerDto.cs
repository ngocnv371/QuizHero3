using System;

namespace QuizHero.Quiz
{
	public class CreateUpdateAnswerDto
	{
		public Guid Id { get; set; }
		public string Text { get; set; } = default!;
		public bool IsCorrect { get; set; }
	}
}