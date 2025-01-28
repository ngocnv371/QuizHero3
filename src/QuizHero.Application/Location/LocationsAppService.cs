using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Volo.Abp.Application.Dtos;
using Volo.Abp.DependencyInjection;

namespace QuizHero.Location
{
	public class LocationsAppService(
		LocationManager locationManager
		) : QuizHeroAppService, ILocationsAppService, ITransientDependency
	{
		public async Task<ListResultDto<LocationDto>> GetAsync()
		{
			var locations = await locationManager.GetLocationsAsync();
			var result = ObjectMapper.Map<IEnumerable<Location>, IEnumerable<LocationDto>>(locations);
			return new ListResultDto<LocationDto>(result.ToArray());
		}
	}
}