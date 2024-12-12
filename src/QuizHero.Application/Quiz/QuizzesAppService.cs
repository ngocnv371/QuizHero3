using QuizHero.Localization;
using QuizHero.Permissions;
using System;
using Volo.Abp.Application.Services;
using Volo.Abp.Domain.Repositories;

namespace QuizHero.Quiz
{
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
	}
}