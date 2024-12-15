import type { CreateUpdateQuestionDto, QuestionDto, QuestionsQueryDto } from './models';
import { RestService, Rest } from '@abp/ng.core';
import type { PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class QuestionsService {
  apiName = 'Default';
  

  create = (input: CreateUpdateQuestionDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, QuestionDto>({
      method: 'POST',
      url: '/api/app/questions',
      body: input,
    },
    { apiName: this.apiName,...config });
  

  delete = (id: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: `/api/app/questions/${id}`,
    },
    { apiName: this.apiName,...config });
  

  get = (id: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, QuestionDto>({
      method: 'GET',
      url: `/api/app/questions/${id}`,
    },
    { apiName: this.apiName,...config });
  

  getList = (input: QuestionsQueryDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, PagedResultDto<QuestionDto>>({
      method: 'GET',
      url: '/api/app/questions',
      params: { quizId: input.quizId, includeAnswers: input.includeAnswers, sorting: input.sorting, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName,...config });
  

  update = (id: string, input: CreateUpdateQuestionDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, QuestionDto>({
      method: 'PUT',
      url: `/api/app/questions/${id}`,
      body: input,
    },
    { apiName: this.apiName,...config });

  constructor(private restService: RestService) {}
}
