import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, catchError, throwError } from 'rxjs';
import { QuestionFormModalComponent } from '../form/question-form-modal.component';
import { QuestionDto, QuestionsService } from '@proxy/quiz';

@Component({
  selector: 'app-question-detail',
  templateUrl: './question-detail.component.html',
  styleUrl: './question-detail.component.scss',
})
export class QuestionDetailComponent implements OnInit {
  @ViewChild(QuestionFormModalComponent)
  formModal!: QuestionFormModalComponent;

  questionId: string;
  question = {} as QuestionDto;
  isLoading = false;

  constructor(route: ActivatedRoute, private service: QuestionsService) {
    this.questionId = route.snapshot.params.questionId;
  }

  ngOnInit() {
    this.reload();
  }

  reload(): void {
    this.isLoading = true;
    this.service
      .get(this.questionId)
      .pipe(
        catchError(error => {
          this.isLoading = false;
          return throwError(() => error);
        })
      )
      .subscribe(v => {
        this.question = v;
        this.isLoading = false;
      });
  }

  onSaved() {
    this.reload();
  }

  onQuestionUpdated(updatedQuestion: QuestionDto) {
    this.question = updatedQuestion;
  }
}
