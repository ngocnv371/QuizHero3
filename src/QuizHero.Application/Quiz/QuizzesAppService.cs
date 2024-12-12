using System;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;
using Volo.Abp.Domain.Repositories;

namespace QuizHero.Quiz
{
	public class QuizzesAppService :
		CrudAppService<Quiz, QuizDto, Guid, PagedAndSortedResultRequestDto, CreateUpdateQuizDto>,
		IQuizzesAppService
	{
		public QuizzesAppService(IRepository<Quiz, Guid> repository)
			: base(repository)
		{
		}
	}
}