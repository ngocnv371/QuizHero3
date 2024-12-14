using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Domain.Entities;
using Volo.Abp.Domain.Repositories;
using Volo.Abp.Domain.Services;
using Volo.Abp.Guids;

namespace QuizHero.Quiz
{
	public class QuestionManager(
		IRepository<Question> questionRepository,
		IRepository<Answer> answerRepository,
		IGuidGenerator guidGenerator
		) : DomainService
	{
		public async Task<Question> CreateQuestionAsync(Question input)
		{
			var answersQuery = await answerRepository.GetQueryableAsync();
			var inputAnswers = input.Answers.ToList();

			// we don't use the raw answers since they could conflict with attached answers
			var answerIds = input.Answers
				.Select(a => a.Id)
				.ToList();
			var oldAnswers = answersQuery
				.Where(q => answerIds.Contains(q.Id))
				.ToList();
			input.Answers.Clear();
			foreach (var answer in inputAnswers)
			{
				var oldAnswer = oldAnswers.FirstOrDefault(a => a.Id == answer.Id);
				if (oldAnswer != null)
				{
					input.Answers.Add(oldAnswer);
					oldAnswer.ChangeText(answer.Text);
					oldAnswer.ChangeIsCorrect(answer.IsCorrect);
				}
				else
				{
					input.AddAnswer(guidGenerator.Create(), answer.Text, answer.IsCorrect);
				}
			}

			return input;
		}
	}
}