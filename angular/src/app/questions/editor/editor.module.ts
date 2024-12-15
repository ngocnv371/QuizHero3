import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { QuestionEditorComponent } from './editor.component';

@NgModule({
  declarations: [QuestionEditorComponent],
  imports: [SharedModule],
  exports: [QuestionEditorComponent],
})
export class QuestionEditorModule {}
