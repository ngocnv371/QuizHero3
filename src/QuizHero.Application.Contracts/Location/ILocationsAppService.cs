using System.Collections.Generic;
using System.Threading.Tasks;
using Volo.Abp.Application.Dtos;

namespace QuizHero.Location
{
	public class LocationDto
	{
		public string Code { get; set; } = default!;
		public string Name { get; set; } = default!;
		public string ParentCode { get; set; } = default!;
	}

	public interface ILocationsAppService
	{
		Task<ListResultDto<LocationDto>> GetAsync();
	}
}