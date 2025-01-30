using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;

namespace QuizHero.Location
{
	public class LocationDto : EntityDto<string>
	{
		public string Name { get; set; } = default!;
		public string ParentId { get; set; } = default!;
	}

	public class CreateUpdateLocationDto
	{
		public string Name { get; set; } = default!;
		public string ParentId { get; set; } = default!;
	}

	public interface ILocationsAppService
		: ICrudAppService<LocationDto, string, PagedAndSortedResultRequestDto, CreateUpdateLocationDto>
	{
	}
}