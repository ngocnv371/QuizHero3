import type { AuditedEntityWithUserDto, EntityDto, PagedAndSortedResultRequestDto } from '@abp/ng.core';
import type { IdentityUserDto } from '../volo/abp/identity/models';

export interface AnswerDto extends EntityDto<string> {
  text?: string;
  isCorrect: boolean;
}

export interface CreateUpdateQuestionDto {
}

export interface CreateUpdateQuizDto {
  title: string;
  description?: string;
}

export interface QuestionDto extends AuditedEntityWithUserDto<string, IdentityUserDto> {
  text?: string;
  answers: AnswerDto[];
}

export interface QuestionsQueryDto extends PagedAndSortedResultRequestDto {
  quizId?: string;
}

export interface QuizDto extends AuditedEntityWithUserDto<string, IdentityUserDto> {
  title?: string;
  description?: string;
  questions: QuestionDto[];
}

export interface QuizzesQueryDto extends PagedAndSortedResultRequestDto {
}
