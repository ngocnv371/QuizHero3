import type { CreateUpdateQuizDto, QuizDto, QuizzesQueryDto } from './models';
import { RestService, Rest } from '@abp/ng.core';
import type { PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class QuizzesService {
  apiName = 'Default';
  

  create = (input: CreateUpdateQuizDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, QuizDto>({
      method: 'POST',
      url: '/api/app/quizzes',
      body: input,
    },
    { apiName: this.apiName,...config });
  

  delete = (id: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: `/api/app/quizzes/${id}`,
    },
    { apiName: this.apiName,...config });
  

  get = (id: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, QuizDto>({
      method: 'GET',
      url: `/api/app/quizzes/${id}`,
    },
    { apiName: this.apiName,...config });
  

  getList = (input: QuizzesQueryDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, PagedResultDto<QuizDto>>({
      method: 'GET',
      url: '/api/app/quizzes',
      params: { topicId: input.topicId, sorting: input.sorting, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName,...config });
  

  update = (id: string, input: CreateUpdateQuizDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, QuizDto>({
      method: 'PUT',
      url: `/api/app/quizzes/${id}`,
      body: input,
    },
    { apiName: this.apiName,...config });

  constructor(private restService: RestService) {}
}
