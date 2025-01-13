using System;
using System.Collections.Generic;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Identity;

namespace QuizHero.Quiz
{
	public class QuizDto : AuditedEntityWithUserDto<Guid, IdentityUserDto>
	{
		public Guid TopicId { get; set; }
		public string TopicName { get; set; } = default!;
		public string Title { get; set; } = default!;
		public string Description { get; set; } = default!;
		public List<QuestionDto> Questions { get; set; } = [];
	}
}