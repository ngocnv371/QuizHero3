using Microsoft.AspNetCore.Authorization;
using QuizHero.Localization;
using QuizHero.Permissions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;
using Volo.Abp.Domain.Repositories;

namespace QuizHero.Quiz
{
	public class TopicsAppService
		: CrudAppService<Topic, TopicDto, Guid, PagedAndSortedResultRequestDto, CreateUpdateTopicDto>,
		ITopicsAppService
	{
		protected readonly IRepository<UserTopic> UserTopicRepository;

		public TopicsAppService(
			IRepository<Topic, Guid> repository,
			IRepository<UserTopic> userTopicRepository
			)
			: base(repository)
		{
			UserTopicRepository = userTopicRepository;

			LocalizationResource = typeof(QuizHeroResource);
			CreatePolicyName = QuizHeroPermissions.Topics.Create;
			UpdatePolicyName = QuizHeroPermissions.Topics.Edit;
			DeletePolicyName = QuizHeroPermissions.Topics.Delete;
		}

		[Authorize(QuizHeroPermissions.Topics.Default)]
		public async Task<ListResultDto<TopicLookupDto>> GetLookupAsync(string? term)
		{
			var query = await Repository.GetQueryableAsync();
			if (!string.IsNullOrWhiteSpace(term))
			{
				query = query.Where(x => x.Name.Contains(term));
			}

			var topics = await AsyncExecuter.ToListAsync(query);
			return new ListResultDto<TopicLookupDto>(
				ObjectMapper.Map<List<Topic>, List<TopicLookupDto>>(topics)
			);
		}

		[Authorize(AuthenticationSchemes = "Zalo")]
		public async Task PutLikeAsync(Guid id, UpdateTopicLikeDto input)
		{
			if (input.Liked)
			{
				var fav = new UserTopic(GuidGenerator.Create(), id);
				await UserTopicRepository.InsertAsync(fav, true);
			}
			else
			{
				await UserTopicRepository.DeleteAsync(x => x.TopicId == id && x.CreatorId == CurrentUser.Id, true);
			}
		}

		[Authorize(AuthenticationSchemes = "Zalo")]
		[Authorize(QuizHeroPermissions.Topics.Default)]
		public async Task<ListResultDto<TopicDto>> GetFavouritesAsync()
		{
			var userTopicsQueryable = await UserTopicRepository.GetQueryableAsync();
			userTopicsQueryable = userTopicsQueryable.Where(x => x.CreatorId == CurrentUser.Id);
			var topicsQueryable = await Repository.GetQueryableAsync();
			var query = from userTopic in userTopicsQueryable
						join topic in topicsQueryable on userTopic.TopicId equals topic.Id
						select topic;
			var entities = await AsyncExecuter.ToListAsync(query);
			var dtos = await MapToGetListOutputDtosAsync(entities);
			return new ListResultDto<TopicDto>(dtos);
		}
	}
}