using System;
using Volo.Abp.Application.Services;

namespace QuizHero.Quiz
{
	public interface IQuestionsAppService
		: ICrudAppService<QuestionDto, Guid, QuestionsQueryDto, CreateUpdateQuestionDto>
	{
	}
}