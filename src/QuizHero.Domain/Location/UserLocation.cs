using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Volo.Abp.Domain.Entities;

namespace QuizHero.Location
{
	[Table("UserLocations", Schema = QuizHeroConsts.DbSchema)]
	public class UserLocation : Entity
	{
		[Required]
		[StringLength(256)]
		public virtual string LocationId { get; protected set; } = default!;


		[Required]
		public virtual Guid UserId { get; protected set; }

		public override object?[] GetKeys()
		{
			return [LocationId, UserId];
		}
	}
}
