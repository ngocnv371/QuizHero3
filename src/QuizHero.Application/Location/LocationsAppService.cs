using System.Collections.Generic;
using System.Threading.Tasks;
using Volo.Abp.DependencyInjection;

namespace QuizHero.Location
{
	public class LocationsAppService(
		LocationManager locationManager
		) : QuizHeroAppService, ILocationsAppService, ITransientDependency
	{
		public async Task<IEnumerable<LocationDto>> GetLocationsAsync()
		{
			var locations = await locationManager.GetLocationsAsync();
			var result = ObjectMapper.Map<IEnumerable<Location>, IEnumerable<LocationDto>>(locations);
			return result;
		}
	}
}