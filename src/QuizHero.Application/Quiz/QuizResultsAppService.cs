using Microsoft.AspNetCore.Authorization;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;
using Volo.Abp.Domain.Entities;
using Volo.Abp.Domain.Repositories;

namespace QuizHero.Quiz
{
	public class QuizResultsAppService
		: CrudAppService<QuizResult, QuizResultDto, Guid, QuizResultQuery, CreateQuizResultDto>
		, IQuizResultsAppService
	{
		protected readonly IRepository<Quiz> _quizRespository;
		protected readonly IRepository<Topic> _topicRepository;

		public QuizResultsAppService(
			IRepository<QuizResult, Guid> repository,
			IRepository<Quiz> quizRespository,
			IRepository<Topic> topicRepository
			)
			: base(repository)
		{
			_quizRespository = quizRespository;
			_topicRepository = topicRepository;
		}

		[Authorize(AuthenticationSchemes = "Zalo")]
		public override async Task<PagedResultDto<QuizResultDto>> GetListAsync(QuizResultQuery input)
		{
			var results = await CreateFilteredQueryAsync(input);
			var topics = await _topicRepository.GetQueryableAsync();
			var quizzes = await _quizRespository.GetQueryableAsync();

			var query = from result in results
						join quiz in quizzes on result.QuizId equals quiz.Id
						join topic in topics on quiz.TopicId equals topic.Id
						select new { 
							result, quiz.Title, topic.Name,
							topic.AvatarUrl, quiz.TopicId ,
							result.QuestionResults
						};

			var totalCount = await AsyncExecuter.CountAsync(query);

			query = query
				.OrderByDescending(q => q.result.CreationTime)
				.Skip(input.SkipCount)
				.Take(input.MaxResultCount);

			var items = await AsyncExecuter.ToListAsync(query);
			var dtos = items.Select(it => new QuizResultDto
			{
				Id = it.result.Id,
				QuizId = it.result.QuizId,
				CreationTime = it.result.CreationTime,
				Topic = it.Name,
				TopicId = it.TopicId,
				Quiz = it.Title,
				TopicAvatarUrl = it.AvatarUrl,
				QuestionResults = ObjectMapper.Map<IEnumerable<QuestionResult>, IEnumerable<QuestionResultDto>>(it.result.QuestionResults),
			}).ToList();

			return new PagedResultDto<QuizResultDto>(totalCount, dtos);
		}


		protected override async Task<IQueryable<QuizResult>> CreateFilteredQueryAsync(QuizResultQuery input)
		{
			var query = await Repository.WithDetailsAsync(d => d.QuestionResults);
			query = query.Where(q => q.CreatorId == CurrentUser.Id);
			return query.WhereIf(input.QuizId.HasValue, q => q.QuizId == input.QuizId);
		}

		protected override async Task<QuizResult> GetEntityByIdAsync(Guid id)
		{
			var query = await Repository.WithDetailsAsync(x => x.QuestionResults);
			query = query.Where(q => q.Id == id);
			var item = await AsyncExecuter.FirstOrDefaultAsync(query);
			if (item == null)
			{
				throw new EntityNotFoundException(typeof(QuizResult), id);
			}

			return item;
		}

		[Authorize(AuthenticationSchemes = "Zalo")]
		public override async Task<QuizResultDto> CreateAsync(CreateQuizResultDto input)
		{
			await CheckCreatePolicyAsync();

			var entity = await MapToEntityAsync(input);
			foreach (var item in entity.QuestionResults)
			{
				EntityHelper.TrySetId(
					item,
					() => GuidGenerator.Create(),
					true
				);
			}

			TryToSetTenantId(entity);

			await Repository.InsertAsync(entity, autoSave: true);

			return await MapToGetOutputDtoAsync(entity);
		}
	}
}