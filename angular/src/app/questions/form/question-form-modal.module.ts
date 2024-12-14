import { NgModule } from '@angular/core';

import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { QuestionFormModalComponent } from './question-form-modal.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [QuestionFormModalComponent],
  imports: [SharedModule, NgbDatepickerModule],
  exports: [QuestionFormModalComponent],
})
export class QuestionFormModalModule {}
