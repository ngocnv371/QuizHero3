using Microsoft.AspNetCore.Authorization;
using QuizHero.Localization;
using QuizHero.Permissions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.InteropServices;
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
		public TopicsAppService(IRepository<Topic, Guid> repository)
			: base(repository)
		{
			LocalizationResource = typeof(QuizHeroResource);
			GetPolicyName = QuizHeroPermissions.Topics.Default;
			GetListPolicyName = QuizHeroPermissions.Topics.Default;
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
	}
}