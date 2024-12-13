import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, catchError, throwError } from 'rxjs';
import { QuizFormModalComponent } from '../form/quiz-form-modal.component';
import { QuizDto, QuizzesService } from '@proxy/quiz';

@Component({
  selector: 'app-quiz-detail',
  templateUrl: './quiz-detail.component.html',
  styleUrl: './quiz-detail.component.scss',
})
export class QuizDetailComponent implements OnInit {
  @ViewChild(QuizFormModalComponent)
  formModal!: QuizFormModalComponent;

  quizId: string;
  quiz = {} as QuizDto;
  isLoading = false;

  constructor(route: ActivatedRoute, private service: QuizzesService) {
    this.quizId = route.snapshot.params.quizId;
  }

  ngOnInit() {
    this.reload();
  }

  reload(): void {
    this.isLoading = true;
    this.service
      .get(this.quizId)
      .pipe(
        catchError(error => {
          this.isLoading = false;
          return throwError(() => error);
        })
      )
      .subscribe(v => {
        this.quiz = v;
        this.isLoading = false;
      });
  }

  onSaved() {
    this.reload();
  }

  onQuizUpdated(updatedQuiz: QuizDto) {
    this.quiz = updatedQuiz;
  }
}
