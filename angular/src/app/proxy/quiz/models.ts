import type { AuditedEntityDto, AuditedEntityWithUserDto, EntityDto, PagedAndSortedResultRequestDto } from '@abp/ng.core';
import type { IdentityUserDto } from '../volo/abp/identity/models';

export interface AnswerDto extends EntityDto<string> {
  text?: string;
  isCorrect: boolean;
}

export interface CreateUpdateAnswerDto {
  id?: string;
  text?: string;
  isCorrect: boolean;
}

export interface CreateUpdateQuestionDto {
  quizId: string;
  text?: string;
  answers: CreateUpdateAnswerDto[];
}

export interface CreateUpdateQuizDto {
  topicId: string;
  title: string;
  description?: string;
}

export interface CreateUpdateTopicDto {
  name: string;
  description?: string;
}

export interface QuestionDto extends AuditedEntityWithUserDto<string, IdentityUserDto> {
  quizId?: string;
  quizTitle?: string;
  text?: string;
  answers: AnswerDto[];
}

export interface QuestionsQueryDto extends PagedAndSortedResultRequestDto {
  quizId?: string;
  includeAnswers: boolean;
}

export interface QuizDto extends AuditedEntityWithUserDto<string, IdentityUserDto> {
  topicId?: string;
  topicName?: string;
  title?: string;
  description?: string;
  questions: QuestionDto[];
}

export interface QuizzesQueryDto extends PagedAndSortedResultRequestDto {
  topicId?: string;
}

export interface TopicDto extends AuditedEntityDto<string> {
  name?: string;
  description?: string;
}

export interface TopicLookupDto extends EntityDto<string> {
  name?: string;
}
