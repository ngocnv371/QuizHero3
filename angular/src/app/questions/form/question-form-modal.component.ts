import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { QuestionDto, QuestionsService } from '@proxy/quiz';
import { catchError, throwError } from 'rxjs';

@Component({
  selector: 'app-question-form-modal',
  templateUrl: './question-form-modal.component.html',
})
export class QuestionFormModalComponent {
  @Output()
  saved = new EventEmitter();

  selectedItem = {} as QuestionDto;

  isModalOpen = false;
  isSaving = false;

  form: FormGroup;

  constructor(private service: QuestionsService, private fb: FormBuilder) {}

  create(quizId: string) {
    this.selectedItem = {} as QuestionDto;
    this.buildForm();
    this.form.patchValue({ quizId });
    this.answers.clear();
    Array.of(0, 0, 0, 0).forEach(_ => {
      this.answers.push(this.fb.group({ text: '', isCorrect: false }));
    });
    this.isModalOpen = true;
  }

  edit(id: string) {
    this.service.get(id).subscribe(req => {
      this.selectedItem = req;
      this.buildForm();
      this.form.patchValue(req);
      this.answers.clear();
      req.answers.forEach(answer => {
        this.answers.push(this.fb.group(answer));
      });
      this.isModalOpen = true;
    });
  }

  buildForm() {
    this.isSaving = false;
    this.form = this.fb.group({
      quizId: ['', Validators.required],
      text: ['', Validators.required],
      answers: this.fb.array([]),
    });
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
    const req = this.selectedItem.id
      ? this.service.update(this.selectedItem.id, this.form.value)
      : this.service.create(this.form.value);

    req
      .pipe(
        catchError(error => {
          this.isSaving = false;
          return throwError(() => error);
        })
      )
      .subscribe(data => {
        this.isModalOpen = false;
        this.form.reset();
        this.saved.emit(data);
      });
  }
}
