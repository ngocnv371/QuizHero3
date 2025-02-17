﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Volo.Abp;
using Volo.Abp.Domain.Entities.Auditing;
using Volo.Abp.Identity;

namespace QuizHero.Quiz
{
	[Table("Questions", Schema = QuizHeroConsts.DbSchema)]
	public class Question : AuditedAggregateRootWithUser<Guid, IdentityUser>
	{
		[Required]
		public Guid QuizId { get; protected set; }

		[ForeignKey(nameof(QuizId))]
		public virtual Quiz Quiz { get; protected set; }

		[Required(AllowEmptyStrings = false)]
		public virtual string Text { get; protected set; } = default!;

		public virtual List<Answer> Answers { get; protected set; } = [];

		protected Question()
		{
			Answers = new List<Answer>();
		}

		public Question(Guid id, Guid quizId, string text)
		{
			Check.NotNullOrWhiteSpace(text, nameof(text));
			Id = id;
			QuizId = quizId;
			Text = text;
			Answers = new List<Answer>();
		}

		public void AddAnswer(Guid id, string text, bool isCorrect)
		{
			Answers.Add(new Answer(id, Id, text, isCorrect));
		}

		public void RemoveAnswer(Guid id)
		{
			Answers.RemoveAll(a => a.Id == id);
		}
	}
}