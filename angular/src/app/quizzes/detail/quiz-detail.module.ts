import { NgModule } from '@angular/core';

import { QuizDetailRoutingModule } from './quiz-detail-routing.module';
import { QuizDetailComponent } from './quiz-detail.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { QuizFormModalModule } from '../form/quiz-form-modal.module';

@NgModule({
  declarations: [QuizDetailComponent],
  imports: [SharedModule, QuizDetailRoutingModule, QuizFormModalModule],
})
export class QuizDetailModule {}
