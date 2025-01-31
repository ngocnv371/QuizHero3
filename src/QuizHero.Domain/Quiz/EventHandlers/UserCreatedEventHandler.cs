using QuizHero.Location;
using System;
using System.Threading.Tasks;
using Volo.Abp.DependencyInjection;
using Volo.Abp.Domain.Entities.Events;
using Volo.Abp.Domain.Repositories;
using Volo.Abp.EventBus;
using Volo.Abp.Identity;

namespace QuizHero.Quiz.EventHandlers
{
	public class UserCreatedEventHandler(IRepository<UserLocation> repository)
		: ILocalEventHandler<EntityCreatedEventData<IdentityUser>>,
		ITransientDependency
	{
		public async Task HandleEventAsync(EntityCreatedEventData<IdentityUser> eventData)
		{
			await SetDefaultLocationAsync(eventData.Entity.Id);
		}

		private async Task SetDefaultLocationAsync(Guid userId)
		{
			var location = new UserLocation(null, userId);
			await repository.InsertAsync(location, true);
		}
	}
}