using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Volo.Abp;
using Volo.Abp.Data;
using Volo.Abp.Domain.Repositories;
using Volo.Abp.Identity;

namespace QuizHero.Quiz
{
	public class LeaderboardAppService(
		IRepository<Quiz, Guid> quizRepository,
		IRepository<QuizResult, Guid> quizResultRepository,
		IIdentityUserRepository identityUserRepository
		) : QuizHeroAppService, ILeaderboardAppService
	{
		public async Task<List<LeaderboardItemDto>> GetAsync(Guid topicId)
		{
			var quizQuery = await quizRepository.GetQueryableAsync();
			var quizResultQuery = await quizResultRepository.GetQueryableAsync();
			var query = from quiz in quizQuery.Where(q => q.TopicId == topicId)
						join quizResult in quizResultQuery.Where(q => q.CreatorId.HasValue) on quiz.Id equals quizResult.QuizId
						group quizResult by new { quizResult.CreatorId, quizResult.QuizId } into g
						select new
						{
							g.Key.CreatorId,
							g.Key.QuizId,
							Score = g.Max(x => x.Score)
						} into bestScoreByQuiz
						group bestScoreByQuiz by bestScoreByQuiz.CreatorId into item
						select new
						{
							UserId = item.Key,
							Score = item.Sum(x => x.Score)
						};
			var leaderboardItems = await AsyncExecuter.ToListAsync(query);

			// fetch related users
			var userIds = leaderboardItems
				.Select(x => x.UserId)
				.Where(x => x != null)
				.Distinct()
				.Cast<Guid>()
				.ToList();
			var users = await identityUserRepository.GetListByIdsAsync(userIds);

			// fill user details
			var dtos = leaderboardItems
				.Select(x =>
				{
					var user = users.First(u => u.Id == x.UserId);
					Check.NotNull(user, nameof(user));
					return new LeaderboardItemDto
					{
						UserId = x.UserId.Value,
						Name = user?.Name,
						AvatarUrl = user.GetAvatarUrl(),
						Score = x.Score
					};
				})
				.OrderByDescending(x => x.Score)
				.ToList();

			// Set ranks
			for (var i = 0; i < dtos.Count; i++)
			{
				var item = dtos[i];
				item.Rank = i + 1;
			}

			return dtos;
		}
	}
}