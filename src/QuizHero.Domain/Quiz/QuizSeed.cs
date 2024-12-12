using System.Threading.Tasks;
using Volo.Abp.Data;
using Volo.Abp.DependencyInjection;
using Volo.Abp.Domain.Repositories;
using Volo.Abp.Guids;

namespace QuizHero.Quiz
{
	public class QuizSeed(
		IRepository<Quiz> quizRepository,
		IRepository<Question> questionRepository,
		IGuidGenerator guidGenerator
		)
		: IDataSeedContributor, ITransientDependency
	{
		public async Task SeedAsync(DataSeedContext context)
		{
			if (await quizRepository.GetCountAsync() == 0)
			{
				var quiz = new Quiz(guidGenerator.Create(), "Quiz 1", "Sample quiz");
				await quizRepository.InsertAsync(quiz, true);

				var question = new Question(guidGenerator.Create(), quiz.Id, "What is the color of the sky?");
				question.AddAnswer(guidGenerator.Create(), "Blue", true);
				question.AddAnswer(guidGenerator.Create(), "Green", false);
				question.AddAnswer(guidGenerator.Create(), "Red", false);
				question.AddAnswer(guidGenerator.Create(), "Yellow", false);

				await questionRepository.InsertAsync(question, true);
			}
		}
	}
}