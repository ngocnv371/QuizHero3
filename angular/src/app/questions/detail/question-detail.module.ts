import { NgModule } from '@angular/core';

import { QuestionDetailRoutingModule } from './question-detail-routing.module';
import { QuestionDetailComponent } from './question-detail.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { QuestionFormModalModule } from '../form/question-form-modal.module';

@NgModule({
  declarations: [QuestionDetailComponent],
  imports: [SharedModule, QuestionDetailRoutingModule, QuestionFormModalModule],
})
export class QuestionDetailModule {}
