using QuizHero.Localization;
using System;
using System.Linq;
using System.Threading.Tasks;
using Volo.Abp.Application.Services;
using Volo.Abp.Domain.Repositories;

namespace QuizHero.Quiz
{
	public class QuestionsAppService :
		CrudAppService<Question, QuestionDto, Guid, QuestionsQueryDto, CreateUpdateQuestionDto>,
		IQuestionsAppService
	{
		public QuestionsAppService(IRepository<Question, Guid> repository)
			: base(repository)
		{
			LocalizationResource = typeof(QuizHeroResource);
		}

		protected override async Task<IQueryable<Question>> CreateFilteredQueryAsync(QuestionsQueryDto input)
		{
			var query = await Repository.WithDetailsAsync(x => x.Answers);
			query = query.WhereIf(input.QuizId.HasValue, x => x.QuizId == input.QuizId);
			return query;
		}
	}
}