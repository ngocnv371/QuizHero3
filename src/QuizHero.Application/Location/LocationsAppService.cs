using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;
using Volo.Abp.DependencyInjection;
using Volo.Abp.Domain.Repositories;

namespace QuizHero.Location
{
	public class LocationsAppService(
		IRepository<Location, string> locationRepository
		) : CrudAppService<Location, LocationDto, string, PagedAndSortedResultRequestDto, CreateUpdateLocationDto>(locationRepository)
		, ILocationsAppService, ITransientDependency
	{
	}
}