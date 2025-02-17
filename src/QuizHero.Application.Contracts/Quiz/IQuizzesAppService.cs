﻿using System;
using System.Threading.Tasks;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;

namespace QuizHero.Quiz
{
	public interface IQuizzesAppService
		: ICrudAppService<QuizDto, Guid, QuizzesQueryDto, CreateUpdateQuizDto>
	{
		Task<QuizDto> GetQuickAsync(Guid topicId);
	}
}