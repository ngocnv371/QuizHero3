import type { CreateUpdateTopicDto, TopicDto, TopicLookupDto } from './models';
import { RestService, Rest } from '@abp/ng.core';
import type { ListResultDto, PagedAndSortedResultRequestDto, PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TopicsService {
  apiName = 'Default';
  

  create = (input: CreateUpdateTopicDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, TopicDto>({
      method: 'POST',
      url: '/api/app/topics',
      body: input,
    },
    { apiName: this.apiName,...config });
  

  delete = (id: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: `/api/app/topics/${id}`,
    },
    { apiName: this.apiName,...config });
  

  get = (id: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, TopicDto>({
      method: 'GET',
      url: `/api/app/topics/${id}`,
    },
    { apiName: this.apiName,...config });
  

  getList = (input: PagedAndSortedResultRequestDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, PagedResultDto<TopicDto>>({
      method: 'GET',
      url: '/api/app/topics',
      params: { sorting: input.sorting, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName,...config });
  

  getLookup = (term: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, ListResultDto<TopicLookupDto>>({
      method: 'GET',
      url: '/api/app/topics/lookup',
      params: { term },
    },
    { apiName: this.apiName,...config });
  

  update = (id: string, input: CreateUpdateTopicDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, TopicDto>({
      method: 'PUT',
      url: `/api/app/topics/${id}`,
      body: input,
    },
    { apiName: this.apiName,...config });

  constructor(private restService: RestService) {}
}
