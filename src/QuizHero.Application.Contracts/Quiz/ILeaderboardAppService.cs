﻿using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Volo.Abp.Application.Dtos;

namespace QuizHero.Quiz
{
	public class LeaderboardItemDto
	{
		public Guid UserId { get; set; }
		public string Name { get; set; } = default!;
		public string AvatarUrl { get; set; } = default!;
		public int Score { get; set; }
		public int Rank { get; set; }
	}

	public interface ILeaderboardAppService
	{
		Task<ListResultDto<LeaderboardItemDto>> GetAsync(Guid topicId);
	}
}