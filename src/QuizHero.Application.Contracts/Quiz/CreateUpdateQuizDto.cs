using System.ComponentModel.DataAnnotations;

namespace QuizHero.Quiz
{
	public class CreateUpdateQuizDto
	{
		[Required]
		[StringLength(256)]
		public string Title { get; set; } = string.Empty;

		public string Description { get; set; } = string.Empty;
	}
}