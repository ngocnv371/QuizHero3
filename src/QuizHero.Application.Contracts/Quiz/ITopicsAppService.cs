using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;

namespace QuizHero.Quiz
{
	public class UpdateTopicLikeDto
	{
		public bool Liked { get; set; }
	}

	public interface ITopicsAppService
		: ICrudAppService<TopicDto, Guid, PagedAndSortedResultRequestDto, CreateUpdateTopicDto>
	{
		Task<ListResultDto<TopicLookupDto>> GetLookupAsync(string? term);

		Task PutLikeAsync(Guid id, UpdateTopicLikeDto input);

		Task<ListResultDto<TopicDto>> GetFavouritesAsync();
	}
}