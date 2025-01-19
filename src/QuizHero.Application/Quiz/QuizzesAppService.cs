using Microsoft.AspNetCore.Authorization;
using QuizHero.Localization;
using QuizHero.Permissions;
using System;
using System.Linq;
using System.Threading.Tasks;
using Volo.Abp;
using Volo.Abp.Application.Services;
using Volo.Abp.Domain.Repositories;

namespace QuizHero.Quiz
{
	public class QuizzesAppService :
		CrudAppService<Quiz, QuizDto, Guid, QuizzesQueryDto, CreateUpdateQuizDto>,
		IQuizzesAppService
	{
		protected IQuestionsAppService QuestionsAppService { get; }

		public QuizzesAppService(
			IRepository<Quiz, Guid> repository,
			IQuestionsAppService questionsAppService
			)
			: base(repository)
		{
			LocalizationResource = typeof(QuizHeroResource);
			CreatePolicyName = QuizHeroPermissions.Quizzes.Create;
			UpdatePolicyName = QuizHeroPermissions.Quizzes.Edit;
			DeletePolicyName = QuizHeroPermissions.Quizzes.Delete;

			QuestionsAppService = questionsAppService;
		}

		protected override async Task<IQueryable<Quiz>> CreateFilteredQueryAsync(QuizzesQueryDto input)
		{
			var query = await Repository.WithDetailsAsync(x => x.Topic);
			query = query.WhereIf(input.TopicId.HasValue, x => x.TopicId == input.TopicId);
			return query;
		}

		protected override async Task<Quiz> GetEntityByIdAsync(Guid id)
		{
			var query = await Repository.WithDetailsAsync(x => x.Topic);
			query = query.Where(q => q.Id == id);
			var item = await AsyncExecuter.FirstOrDefaultAsync(query);
			return item;
		}

		public override async Task<QuizDto> GetAsync(Guid id)
		{
			await CheckGetPolicyAsync();
			var entity = await GetEntityByIdAsync(id);
			var dto = MapToGetOutputDto(entity);
			Check.NotNull(dto, nameof(dto));

			var query = new QuestionsQueryDto { QuizId = id, IncludeAnswers = true };
			var questions = await QuestionsAppService.GetListAsync(query);
			dto.Questions = questions.Items.ToList();

			return dto;
		}
	}
}