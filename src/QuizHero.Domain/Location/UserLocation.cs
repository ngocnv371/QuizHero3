using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Diagnostics.CodeAnalysis;
using Volo.Abp.Domain.Entities;

namespace QuizHero.Location
{
	[Table("UserLocations", Schema = QuizHeroConsts.DbSchema)]
	public class UserLocation : Entity
	{
		[StringLength(256)]
		[AllowNull]
		public virtual string LocationId { get; protected set; } = default!;


		[Required]
		public virtual Guid UserId { get; protected set; }

		public override object?[] GetKeys()
		{
			return [UserId];
		}

		protected UserLocation() { }

		public UserLocation([AllowNull] string locationId, Guid userId)
		{
			LocationId = locationId;
			UserId = userId;
		}

		public UserLocation SetLocation(string locationId)
		{
			LocationId = locationId;
			return this;
		}
	}
}
