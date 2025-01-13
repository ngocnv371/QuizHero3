using System;
using System.ComponentModel.DataAnnotations;

namespace QuizHero.Quiz
{
	public class CreateUpdateQuizDto
	{
		[Required]
		public Guid TopicId { get; set; }

		[Required]
		[StringLength(256)]
		public string Title { get; set; } = default!;

		public string Description { get; set; } = default!;
	}
}