import { ListService, PagedResultDto } from '@abp/ng.core';
import { Confirmation, ConfirmationService } from '@abp/ng.theme.shared';
import { Component, OnInit, ViewChild } from '@angular/core';
import { TopicFormModalComponent } from './form/topic-form-modal.component';
import { TopicDto, TopicsService } from '@proxy/quiz';

@Component({
  selector: 'app-topics',
  templateUrl: './topics.component.html',
  styleUrl: './topics.component.scss',
  providers: [ListService],
})
export class TopicsComponent implements OnInit {
  @ViewChild(TopicFormModalComponent) formModal!: TopicFormModalComponent;

  data = { items: [], totalCount: 0 } as PagedResultDto<TopicDto>;

  constructor(
    public readonly list: ListService,
    private service: TopicsService,
    private confirmation: ConfirmationService
  ) {}

  ngOnInit() {
    const bookStreamCreator = query => this.service.getList(query);

    this.list.hookToQuery(bookStreamCreator).subscribe(response => {
      this.data = response;
    });
  }

  delete(id: string) {
    this.confirmation.warn('::AreYouSureToDelete', '::AreYouSure').subscribe(status => {
      if (status === Confirmation.Status.confirm) {
        this.service.delete(id).subscribe(() => this.list.get());
      }
    });
  }

  onSaved() {
    this.list.get();
  }
}
