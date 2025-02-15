﻿using System;
using Volo.Abp.Application.Dtos;

namespace QuizHero.Quiz
{
	public class TopicLookupDto : EntityDto<Guid>
	{
		public string Name { get; set; } = default!;
		public string AvatarUrl { get; set; } = default!;
	}
}