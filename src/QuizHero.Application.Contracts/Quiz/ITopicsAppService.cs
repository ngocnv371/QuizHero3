using System;
using System.Threading.Tasks;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;

namespace QuizHero.Quiz
{
	public interface ITopicsAppService
		: ICrudAppService<TopicDto, Guid, PagedAndSortedResultRequestDto, CreateUpdateTopicDto>
	{
		Task<ListResultDto<TopicLookupDto>> GetLookupAsync(string? term);
	}
}