import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { QuestionDto, QuestionsService } from '@proxy/quiz';
import { catchError, throwError } from 'rxjs';

@Component({
  selector: 'app-question-preview',
  templateUrl: './preview.component.html',
})
export class QuestionPreviewComponent {
  @Output()
  editClick = new EventEmitter();

  @Input({ required: true }) question!: QuestionDto;

  onClicked() {
    this.editClick.emit(this.question);
  }
}
