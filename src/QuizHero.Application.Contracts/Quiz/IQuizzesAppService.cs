﻿using System;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;

namespace QuizHero.Quiz
{
	public interface IQuizzesAppService
		: ICrudAppService<QuizDto, Guid, PagedAndSortedResultRequestDto, CreateUpdateQuizDto>
	{
	}
}