import { ListService, PagedResultDto } from '@abp/ng.core';
import { Confirmation, ConfirmationService } from '@abp/ng.theme.shared';
import { Component, OnInit, ViewChild } from '@angular/core';
import { QuizDto, QuizzesService } from '@proxy/quiz';
import { QuizFormModalComponent } from './form/quiz-form-modal.component';

@Component({
  selector: 'app-quizzes',
  templateUrl: './quizzes.component.html',
  styleUrl: './quizzes.component.scss',
  providers: [ListService],
})
export class QuizzesComponent implements OnInit {
  @ViewChild(QuizFormModalComponent) formModal!: QuizFormModalComponent;

  data = { items: [], totalCount: 0 } as PagedResultDto<QuizDto>;

  constructor(
    public readonly list: ListService,
    private service: QuizzesService,
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
