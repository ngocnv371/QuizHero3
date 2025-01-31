using QuizHero.Location;
using System;
using System.Threading.Tasks;
using Volo.Abp.DependencyInjection;
using Volo.Abp.Domain.Entities.Events.Distributed;
using Volo.Abp.Domain.Repositories;
using Volo.Abp.EventBus.Distributed;
using Volo.Abp.Users;

namespace QuizHero.Quiz.EventHandlers
{
	public class UserCreatedEventHandler(IRepository<UserLocation> repository)
		: IDistributedEventHandler<EntityCreatedEto<UserEto>>,
		ITransientDependency
	{
		public async Task HandleEventAsync(EntityCreatedEto<UserEto> eventData)
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