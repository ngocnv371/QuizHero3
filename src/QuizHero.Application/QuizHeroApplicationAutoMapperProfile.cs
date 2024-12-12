using AutoMapper;
using QuizHero.Quiz;

namespace QuizHero;

public class QuizHeroApplicationAutoMapperProfile : Profile
{
	public QuizHeroApplicationAutoMapperProfile()
	{
		/* You can configure your AutoMapper mapping configuration here.
         * Alternatively, you can split your mapping configurations
         * into multiple profile classes for a better organization. */

		CreateMap<Quiz.Quiz, QuizDto>();
		CreateMap<Question, QuestionDto>();
		CreateMap<Answer, AnswerDto>();
	}
}