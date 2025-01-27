using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Volo.Abp;
using Volo.Abp.Data;
using Volo.Abp.DependencyInjection;
using Volo.Abp.Domain.Repositories;
using Volo.Abp.Guids;

namespace QuizHero.Quiz
{
	public class QuizSeed(
		IRepository<Topic> topicRepository,
		IRepository<Quiz> quizRepository,
		IRepository<Question> questionRepository,
		IGuidGenerator guidGenerator
		)
		: IDataSeedContributor, ITransientDependency
	{
		public async Task SeedAsync(DataSeedContext context)
		{
			if (await topicRepository.GetCountAsync() == 0)
			{
				var topic1 = CreateTopic("Math", "Academic");
				var topic2 = CreateTopic("Common", "General");
				var topic3 = CreateTopic("Names", "General");
				Topic[] topics = [topic1, topic2, topic3];
				await topicRepository.InsertManyAsync(topics, true);

				for (var i = 0; i < topics.Length; i++)
				{
					var num = RandomHelper.GetRandom(2, 8);
					for (var j = 0; j < num; j++)
					{
						await SeedQuiz(topics[i].Id);
					}
				}
			}
		}

		private Topic CreateTopic(string name, string category)
		{
			var topic = new Topic(
				guidGenerator.Create(),
				name,
				category,
				$"Description of {name}",
				$"https://picsum.photos/128/128?id={name}",
				$"https://picsum.photos/300/200?id={name}"
			);
			return topic;
		}

		private async Task SeedQuiz(Guid topicId)
		{
			var index = RandomHelper.GetRandom(5000, 20_000);
			var quiz = new Quiz(guidGenerator.Create(), topicId, $"Quiz {index}", "Sample quiz");
			await quizRepository.InsertAsync(quiz, true);

			var num = RandomHelper.GetRandom(3, 5);
			var list = new List<Question>();
			for (var i = 0; i < num; i++)
			{
				list.Add(CreateQuestion(quiz.Id));
			}
			await questionRepository.InsertManyAsync(list, true);
		}

		private Question CreateQuestion(Guid quizId)
		{
			var num = RandomHelper.GetRandom(1, 1_000_000);
			var question = new Question(guidGenerator.Create(), quizId, $"Question content {num}?");
			question.AddAnswer(guidGenerator.Create(), "Option 1", false);
			question.AddAnswer(guidGenerator.Create(), "Option 2", false);
			question.AddAnswer(guidGenerator.Create(), "Option 3", false);
			question.AddAnswer(guidGenerator.Create(), "Option 4", false);
			var correctChoice = RandomHelper.GetRandomOfList(question.Answers);
			correctChoice.ChangeIsCorrect(true);
			correctChoice.ChangeText(correctChoice.Text + " (correct)");
			return question;
		}
	}
}