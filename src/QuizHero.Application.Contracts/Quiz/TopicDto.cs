using System;
using Volo.Abp.Application.Dtos;

namespace QuizHero.Quiz
{
	public class TopicDto : AuditedEntityDto<Guid>
	{
		public string Name { get; set; } = default!;
		public string Description { get; set; } = default!;
		public string AvatarUrl { get; set; } = default!;
		public string CoverUrl { get; set; } = default!;
	}
}