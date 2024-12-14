using QuizHero.Localization;
using QuizHero.Permissions;
using System;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;
using Volo.Abp.Domain.Repositories;

namespace QuizHero.Quiz
{
	public class AnswersAppService
		: CrudAppService<Answer, AnswerDto, Guid, PagedAndSortedResultRequestDto, CreateUpdateAnswerDto>,
		IAnswersAppService
	{
		public AnswersAppService(IRepository<Answer, Guid> repository)
			: base(repository)
		{
			LocalizationResource = typeof(QuizHeroResource);
			GetPolicyName = QuizHeroPermissions.Quizzes.Default;
			GetListPolicyName = QuizHeroPermissions.Quizzes.Default;
			CreatePolicyName = QuizHeroPermissions.Quizzes.Edit;
			UpdatePolicyName = QuizHeroPermissions.Quizzes.Edit;
			DeletePolicyName = QuizHeroPermissions.Quizzes.Edit;
		}
	}
}