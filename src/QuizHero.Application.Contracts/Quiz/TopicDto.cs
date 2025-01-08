using System;
using Volo.Abp.Application.Dtos;

namespace QuizHero.Quiz
{
	public class TopicDto : AuditedEntityDto<Guid>
	{
		public string Name { get; set; }
		public string Description { get; set; }
		public string AvatarUrl { get; set; }
		public string CoverUrl { get; set; }
	}
}