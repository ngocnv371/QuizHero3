using Microsoft.AspNetCore.Authorization;
using QuizHero.Localization;
using QuizHero.Permissions;
using System;
using System.Linq;
using System.Threading.Tasks;
using Volo.Abp.Application.Services;
using Volo.Abp.Domain.Repositories;

namespace QuizHero.Quiz
{
	[Authorize(AuthenticationSchemes = "Zalo")]
	public class QuizzesAppService :
		CrudAppService<Quiz, QuizDto, Guid, QuizzesQueryDto, CreateUpdateQuizDto>,
		IQuizzesAppService
	{
		public QuizzesAppService(IRepository<Quiz, Guid> repository)
			: base(repository)
		{
			LocalizationResource = typeof(QuizHeroResource);
			GetPolicyName = QuizHeroPermissions.Quizzes.Default;
			GetListPolicyName = QuizHeroPermissions.Quizzes.Default;
			CreatePolicyName = QuizHeroPermissions.Quizzes.Create;
			UpdatePolicyName = QuizHeroPermissions.Quizzes.Edit;
			DeletePolicyName = QuizHeroPermissions.Quizzes.Delete;
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
	}
}