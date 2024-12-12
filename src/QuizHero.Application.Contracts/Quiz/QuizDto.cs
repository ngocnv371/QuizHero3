﻿using System;
using System.Collections.Generic;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Identity;

namespace QuizHero.Quiz
{
	public class QuizDto : AuditedEntityWithUserDto<Guid, IdentityUserDto>
	{
		public string Title { get; set; }
		public string Description { get; set; }
		public List<QuestionDto> Questions { get; set; }
	}
}