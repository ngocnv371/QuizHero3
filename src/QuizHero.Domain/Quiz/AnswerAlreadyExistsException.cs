using Volo.Abp;

namespace QuizHero.Quiz
{
	public class AnswerAlreadyExistsException : BusinessException
	{
		public AnswerAlreadyExistsException(string text)
			: base(QuizHeroDomainErrorCodes.AnswerAlreadyExists)
		{
			WithData("text", text);
		}
	}
}