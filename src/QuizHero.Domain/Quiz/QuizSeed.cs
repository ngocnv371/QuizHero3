using System.Threading.Tasks;
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
				// create topic 1
				var topic1 = new Topic(
					guidGenerator.Create(),
					"General Knowledge",
					"General",
					"General knowledge questions",
					"https://picsum.photos/128/128?id=1",
					"https://picsum.photos/300/200?id=1"
					);
				await topicRepository.InsertAsync(topic1, true);

				// create topic 2
				var topic2 = new Topic(
					guidGenerator.Create(),
					"Common Sense",
					"General",
					"People need to know this",
					"https://picsum.photos/128/128?id=2",
					"https://picsum.photos/300/200?id=2"
					);
				await topicRepository.InsertAsync(topic2, true);

				// create quiz 1
				await SeedQuiz(topic1);
				await SeedQuiz2(topic2);
			}
		}

		private async Task SeedQuiz(Topic topic)
		{
			var quiz = new Quiz(guidGenerator.Create(), topic.Id, "Quiz 1", "Sample quiz");
			await quizRepository.InsertAsync(quiz, true);

			await SeedQuestions(quiz);
		}

		private async Task SeedQuestions(Quiz quiz)
		{
			var question = new Question(guidGenerator.Create(), quiz.Id, "What is the color of the sky?");
			question.AddAnswer(guidGenerator.Create(), "Blue", true);
			question.AddAnswer(guidGenerator.Create(), "Green", false);
			question.AddAnswer(guidGenerator.Create(), "Red", false);
			question.AddAnswer(guidGenerator.Create(), "Yellow", false);
			await questionRepository.InsertAsync(question, true);

			var question2 = new Question(guidGenerator.Create(), quiz.Id, "How long is an hour?");
			question2.AddAnswer(guidGenerator.Create(), "24 seconds", false);
			question2.AddAnswer(guidGenerator.Create(), "60 seconds", true);
			question2.AddAnswer(guidGenerator.Create(), "12 days", false);
			question2.AddAnswer(guidGenerator.Create(), "yesterday", false);
			await questionRepository.InsertAsync(question2, true);
		}

		private async Task SeedQuiz2(Topic topic)
		{
			var quiz = new Quiz(guidGenerator.Create(), topic.Id, "Quiz 2", "Sample quiz 2");
			await quizRepository.InsertAsync(quiz, true);

			await SeedQuestions2(quiz);
		}

		private async Task SeedQuestions2(Quiz quiz)
		{
			var question = new Question(guidGenerator.Create(), quiz.Id, "How long can a dog typically live?");
			question.AddAnswer(guidGenerator.Create(), "a life", false);
			question.AddAnswer(guidGenerator.Create(), "100 years", false);
			question.AddAnswer(guidGenerator.Create(), "20 years", true);
			question.AddAnswer(guidGenerator.Create(), "long", false);
			await questionRepository.InsertAsync(question, true);

			var question2 = new Question(guidGenerator.Create(), quiz.Id, "What is 1 + 3?");
			question2.AddAnswer(guidGenerator.Create(), "3", false);
			question2.AddAnswer(guidGenerator.Create(), "4", true);
			question2.AddAnswer(guidGenerator.Create(), "true", false);
			question2.AddAnswer(guidGenerator.Create(), "false", false);
			await questionRepository.InsertAsync(question2, true);
		}
	}
}