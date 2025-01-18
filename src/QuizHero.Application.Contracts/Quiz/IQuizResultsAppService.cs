using System;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;

namespace QuizHero.Quiz
{
	public interface IQuizResultsAppService
		: ICrudAppService<QuizResultDto, Guid, QuizResultQuery, QuizResultDto>
	{
	}
}