import { ListService, PagedResultDto } from '@abp/ng.core';
import { Confirmation, ConfirmationService } from '@abp/ng.theme.shared';
import { Component, OnInit, ViewChild } from '@angular/core';
import { QuestionFormModalComponent } from './form/question-form-modal.component';
import { QuestionDto, QuestionsService } from '@proxy/quiz';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrl: './questions.component.scss',
  providers: [ListService],
})
export class QuestionsComponent implements OnInit {
  @ViewChild(QuestionFormModalComponent) formModal!: QuestionFormModalComponent;

  data = { items: [], totalCount: 0 } as PagedResultDto<QuestionDto>;

  constructor(
    public readonly list: ListService,
    private service: QuestionsService,
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
