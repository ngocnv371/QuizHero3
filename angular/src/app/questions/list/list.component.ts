import { ListService, PagedResultDto } from '@abp/ng.core';
import { Confirmation, ConfirmationService } from '@abp/ng.theme.shared';
import { Component, Input, OnInit } from '@angular/core';
import { QuestionDto, QuestionsService } from '@proxy/quiz';

@Component({
  selector: 'app-questions-list',
  templateUrl: './list.component.html',
  providers: [ListService],
})
export class QuestionsListComponent implements OnInit {
  @Input({ required: true }) quizId!: string;

  data = { items: [], totalCount: 0 } as PagedResultDto<QuestionDto>;

  constructor(
    public readonly list: ListService,
    private service: QuestionsService,
    private confirmation: ConfirmationService
  ) {}

  ngOnInit() {
    const bookStreamCreator = query =>
      this.service.getList({ ...query, quizId: this.quizId, includeAnswers: true });

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

  trackById(index, item) {
    return item.id;
  }
}
