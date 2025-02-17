import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TopicDto, TopicsService } from '@proxy/quiz';
import { catchError, throwError } from 'rxjs';

@Component({
  selector: 'app-topic-form-modal',
  templateUrl: './topic-form-modal.component.html',
})
export class TopicFormModalComponent {
  @Output()
  saved = new EventEmitter();

  selectedItem = {} as TopicDto;

  isModalOpen = false;
  isSaving = false;

  form: FormGroup;

  constructor(private service: TopicsService, private fb: FormBuilder) {}

  create() {
    this.selectedItem = {} as TopicDto;
    this.buildForm();
    this.isModalOpen = true;
  }

  edit(id: string) {
    this.service.get(id).subscribe(req => {
      this.selectedItem = req;
      this.buildForm();
      this.form.patchValue(req);
      this.isModalOpen = true;
    });
  }

  buildForm() {
    this.isSaving = false;
    this.form = this.fb.group({
      name: ['', Validators.required],
      description: [''],
    });
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
