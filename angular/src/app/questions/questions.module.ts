import { NgModule } from '@angular/core';

import { QuestionsRoutingModule } from './questions-routing.module';
import { QuestionsComponent } from './questions.component';
import { SharedModule } from '../shared/shared.module';
import { QuestionFormModalModule } from './form/question-form-modal.module';

@NgModule({
  declarations: [QuestionsComponent],
  imports: [QuestionsRoutingModule, SharedModule, QuestionFormModalModule],
})
export class QuestionsModule {}
