﻿using System;
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
		public string Name { get; protected set; }

		public string Description { get; protected set; }

		protected Topic()
		{
		}

		public Topic(Guid id, [NotNull] string name, string description)
		{
			Check.NotNullOrWhiteSpace(name, nameof(name));
			Id = id;
			Name = name;
			Description = description;
		}
	}
}