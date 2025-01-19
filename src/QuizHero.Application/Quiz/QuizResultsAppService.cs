using Microsoft.AspNetCore.Authorization;
using System;
using System.Linq;
using System.Threading.Tasks;
using Volo.Abp.Application.Services;
using Volo.Abp.Domain.Entities;
using Volo.Abp.Domain.Repositories;

namespace QuizHero.Quiz
{
	public class QuizResultsAppService
		: CrudAppService<QuizResult, QuizResultDto, Guid, QuizResultQuery, CreateQuizResultDto>
		, IQuizResultsAppService
	{
		public QuizResultsAppService(
			IRepository<QuizResult, Guid> repository
			)
			: base(repository)
		{
		}

		protected override async Task<IQueryable<QuizResult>> CreateFilteredQueryAsync(QuizResultQuery input)
		{
			var query = await Repository.WithDetailsAsync(d => d.QuestionResults);
			return query.Where(q => q.QuizId == input.QuizId);
		}

		protected override async Task<QuizResult> GetEntityByIdAsync(Guid id)
		{
			var query = await Repository.WithDetailsAsync(x => x.QuestionResults);
			query = query.Where(q => q.Id == id);
			var item = await AsyncExecuter.FirstOrDefaultAsync(query);
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