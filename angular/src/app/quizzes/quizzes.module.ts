import { NgModule } from '@angular/core';

import { QuizzesRoutingModule } from './quizzes-routing.module';
import { QuizzesComponent } from './quizzes.component';
import { SharedModule } from '../shared/shared.module';
import { QuizFormModalModule } from './form/quiz-form-modal.module';

@NgModule({
  declarations: [QuizzesComponent],
  imports: [QuizzesRoutingModule, SharedModule, QuizFormModalModule],
})
export class QuizzesModule {}
