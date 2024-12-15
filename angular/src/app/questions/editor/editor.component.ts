import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { QuestionDto, QuestionsService } from '@proxy/quiz';
import { catchError, throwError } from 'rxjs';

@Component({
  selector: 'app-question-editor',
  templateUrl: './editor.component.html',
})
export class QuestionEditorComponent implements OnInit {
  @Output()
  saved = new EventEmitter();

  @Input({ required: true }) question!: QuestionDto;

  isSaving = false;

  form: FormGroup;

  constructor(private service: QuestionsService, private fb: FormBuilder) {}

  ngOnInit() {
    this.buildForm();
  }

  buildNewForm() {
    this.form.patchValue(this.question);
    this.answers.clear();
    Array.of(0, 0, 0, 0).forEach(_ => {
      this.answers.push(this.fb.group({ text: '', isCorrect: false }));
    });
  }

  buildEditForm() {
    this.form.patchValue(this.question);
    this.answers.clear();
    this.question.answers.forEach(answer => {
      this.answers.push(this.fb.group(answer));
    });
  }

  buildForm() {
    this.isSaving = false;
    this.form = this.fb.group({
      quizId: ['', Validators.required],
      text: ['', Validators.required],
      answers: this.fb.array([]),
    });

    if (this.question.id) {
      this.buildEditForm();
    } else {
      this.buildNewForm();
    }
  }

  get answers() {
    return this.form.get('answers') as FormArray;
  }

  addAnswer() {
    this.answers.push(this.fb.group({ text: '', isCorrect: false }));
  }

  removeAnswer(index: number) {
    this.answers.removeAt(index);
  }

  save() {
    if (this.form.invalid) {
      console.debug('validation', this.form.errors);
      return;
    }

    this.isSaving = true;
    const req = this.question.id
      ? this.service.update(this.question.id, this.form.value)
      : this.service.create(this.form.value);

    req
      .pipe(
        catchError(error => {
          this.isSaving = false;
          return throwError(() => error);
        })
      )
      .subscribe(data => {
        this.isSaving = false;
        this.saved.emit(data);
      });
  }
}
