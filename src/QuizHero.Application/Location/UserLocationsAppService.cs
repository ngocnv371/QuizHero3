using Microsoft.AspNetCore.Authorization;
using System.Threading.Tasks;
using Volo.Abp.DependencyInjection;
using Volo.Abp.Domain.Repositories;

namespace QuizHero.Location
{
	public class UserLocationsAppService(IRepository<UserLocation> repository) :
		QuizHeroAppService, IUserLocationsAppService, ITransientDependency
	{
		[Authorize(AuthenticationSchemes = "Zalo")]
		public async Task PutAsync(UpdateUserLocationInputDto input)
		{
			var location = await repository.FindAsync(r => r.UserId == CurrentTenant.Id);
			if (location == null)
			{
				throw new System.Exception("User location not found");
			}

			location.SetLocation(input.LocationId);
			await repository.UpdateAsync(location);
		}

		public async Task<UserLocationDto> GetAsync()
		{
			var location = await repository.FindAsync(r => r.UserId == CurrentTenant.Id);
			if (location == null)
			{
				throw new System.Exception("User location not found");
			}

			return ObjectMapper.Map<UserLocation, UserLocationDto>(location);
		}
	}
}