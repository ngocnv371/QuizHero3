using QuizHero.Localization;
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
		}
	}
}