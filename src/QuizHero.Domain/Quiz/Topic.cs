using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Diagnostics.CodeAnalysis;
using Volo.Abp;
using Volo.Abp.Domain.Entities.Auditing;
using Volo.Abp.Identity;

namespace QuizHero.Quiz
{
	[Table("Topics", Schema = QuizHeroConsts.DbSchema)]
	public class Topic : AuditedEntityWithUser<Guid, IdentityUser>
	{
		[StringLength(256)]
		[Required(AllowEmptyStrings = false)]
		public string Name { get; protected set; } = default!;

		[StringLength(256)]
		[Required(AllowEmptyStrings = false)]
		public string Category { get; protected set; } = default!;

		public string Description { get; protected set; } = default!;
		public string AvatarUrl { get; protected set; } = "";
		public string CoverUrl { get; protected set; } = "";

		protected Topic()
		{
		}

		public Topic(Guid id, [NotNull] string name, [NotNull] string category, string description)
		{
			Check.NotNullOrWhiteSpace(name, nameof(name));
			Check.NotNullOrWhiteSpace(category, nameof(category));
			Id = id;
			Name = name;
			Category = category;
			Description = description;
		}
	}
}