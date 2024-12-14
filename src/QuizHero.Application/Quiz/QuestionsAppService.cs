using QuizHero.Localization;
using QuizHero.Permissions;
using System;
using System.Linq;
using System.Threading.Tasks;
using Volo.Abp.Application.Services;
using Volo.Abp.Domain.Repositories;
using Volo.Abp.ObjectMapping;
using Volo.Abp.Uow;

namespace QuizHero.Quiz
{
	public class QuestionsAppService :
		CrudAppService<Question, QuestionDto, Guid, QuestionsQueryDto, CreateUpdateQuestionDto>,
		IQuestionsAppService
	{
		private readonly QuestionManager QuestionManager;
		private readonly IAnswersAppService AnswersAppService;

		public QuestionsAppService(
			IRepository<Question, Guid> repository,
			QuestionManager questionManager,
			IAnswersAppService answersAppService
			)
			: base(repository)
		{
			LocalizationResource = typeof(QuizHeroResource);
			GetPolicyName = QuizHeroPermissions.Quizzes.Default;
			GetListPolicyName = QuizHeroPermissions.Quizzes.Default;
			CreatePolicyName = QuizHeroPermissions.Quizzes.Edit;
			UpdatePolicyName = QuizHeroPermissions.Quizzes.Edit;
			DeletePolicyName = QuizHeroPermissions.Quizzes.Edit;

			QuestionManager = questionManager;
			AnswersAppService = answersAppService;
		}

		protected override async Task<IQueryable<Question>> CreateFilteredQueryAsync(QuestionsQueryDto input)
		{
			var query = await Repository.WithDetailsAsync(x => x.Quiz);
			query = query.WhereIf(input.QuizId.HasValue, x => x.QuizId == input.QuizId);
			return query;
		}

		protected override async Task<Question> GetEntityByIdAsync(Guid id)
		{
			var query = await Repository.WithDetailsAsync(x => x.Quiz, x => x.Answers);
			query = query.Where(q => q.Id == id);
			var item = await AsyncExecuter.FirstOrDefaultAsync(query);
			return item;
		}

		//public override async Task<QuestionDto> CreateAsync(CreateUpdateQuestionDto input)
		//{
		//	await CheckCreatePolicyAsync();

		//	var entity = await MapToEntityAsync(input);
		//	//entity = await QuestionManager.CreateQuestionAsync(entity);

		//	TryToSetTenantId(entity);

		//	await Repository.InsertAsync(entity, autoSave: true);

		//	return await MapToGetOutputDtoAsync(entity);
		//}

		[UnitOfWork]
		public override async Task<QuestionDto> UpdateAsync(Guid id, CreateUpdateQuestionDto input)
		{
			var query = await Repository.WithDetailsAsync(x => x.Answers);
			await CheckUpdatePolicyAsync();

			var entity = query.FirstOrDefault(x => x.Id == id);

			await MapToEntityAsync(input, entity);
			await Repository.UpdateAsync(entity, autoSave: true);

			return await MapToGetOutputDtoAsync(entity);
		}
	}
}