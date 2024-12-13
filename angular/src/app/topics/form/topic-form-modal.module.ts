import { NgModule } from '@angular/core';

import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { TopicFormModalComponent } from './topic-form-modal.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [TopicFormModalComponent],
  imports: [SharedModule, NgbDatepickerModule],
  exports: [TopicFormModalComponent],
})
export class TopicFormModalModule {}
