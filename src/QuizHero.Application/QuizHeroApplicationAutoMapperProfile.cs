using AutoMapper;
using QuizHero.Location;
using QuizHero.Quiz;
using System.Linq;

namespace QuizHero;

public class QuizHeroApplicationAutoMapperProfile : Profile
{
	public QuizHeroApplicationAutoMapperProfile()
	{
		/* You can configure your AutoMapper mapping configuration here.
         * Alternatively, you can split your mapping configurations
         * into multiple profile classes for a better organization. */

		CreateMap<Quiz.Quiz, QuizDto>()
			.ForMember(q => q.TopicName, opt => opt.MapFrom(o => o.Topic.Name))
			;
		CreateMap<CreateUpdateQuizDto, Quiz.Quiz>();
		CreateMap<Question, QuestionDto>()
			.ForMember(q => q.QuizTitle, opt => opt.MapFrom(o => o.Quiz.Title))
			;
		CreateMap<CreateUpdateQuestionDto, Question>();
		CreateMap<CreateUpdateAnswerDto, Answer>();
		CreateMap<Answer, AnswerDto>();

		CreateMap<Topic, TopicDto>();
		CreateMap<Topic, TopicLookupDto>();
		CreateMap<CreateUpdateTopicDto, Topic>();

		CreateMap<QuizResult, QuizResultDto>();
		CreateMap<QuestionResult, QuestionResultDto>();
		CreateMap<CreateQuizResultDto, QuizResult>()
			.ForMember(m => m.Score, opt => opt.MapFrom(k => k.QuestionResults.Count(q => q.IsCorrect)))
			;
		CreateMap<CreateQuestionResultDto, QuestionResult>();

		CreateMap<Location.Location, LocationDto>();
		CreateMap<CreateUpdateLocationDto, Location.Location>();
		CreateMap<UserLocation, UserLocationDto>();
	}
}