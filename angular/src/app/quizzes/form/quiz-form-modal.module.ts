import { NgModule } from '@angular/core';

import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { QuizFormModalComponent } from './quiz-form-modal.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [QuizFormModalComponent],
  imports: [SharedModule, NgbDatepickerModule],
  exports: [QuizFormModalComponent],
})
export class QuizFormModalModule {}
