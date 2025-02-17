﻿using System;
using System.ComponentModel.DataAnnotations;

namespace QuizHero.Quiz
{
	public class CreateUpdateTopicDto
	{
		[StringLength(256)]
		[Required(AllowEmptyStrings = false)]
		public string Name { get; set; } = default!;

		public string Description { get; set; } = default!;
	}
}