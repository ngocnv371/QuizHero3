import { NgModule } from '@angular/core';
import { QuestionsListComponent } from './list.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { QuestionEditorModule } from '../editor/editor.module';

@NgModule({
  declarations: [QuestionsListComponent],
  imports: [SharedModule, QuestionEditorModule],
  exports: [QuestionsListComponent],
})
export class QuestionsListModule {}
