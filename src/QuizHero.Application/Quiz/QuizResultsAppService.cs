using Microsoft.AspNetCore.Authorization;
using System;
using System.Linq;
using System.Threading.Tasks;
using Volo.Abp.Application.Services;
using Volo.Abp.Domain.Repositories;

namespace QuizHero.Quiz
{
	public class QuizResultsAppService
		: CrudAppService<QuizResult, QuizResultDto, Guid, QuizResultQuery, QuizResultDto>
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
		public override Task<QuizResultDto> CreateAsync(QuizResultDto input)
		{
			return base.CreateAsync(input);
		}
	}
}