using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Volo.Abp.Domain.Entities;

namespace QuizHero.Location
{
	[Table("Locations", Schema = QuizHeroConsts.DbSchema)]
	public class Location : Entity<string>
	{
		[StringLength(256)]
		public string Name { get; protected set; } = default!;

		[StringLength(256)]
		public string ParentId { get; protected set; } = default!;

		protected Location()
		{
		}

		public Location(string id, string name, string parentId)
			: base(id)
		{
			Name = name;
			ParentId = parentId;
		}
	}
}