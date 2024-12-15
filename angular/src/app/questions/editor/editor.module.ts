import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { QuestionEditorComponent } from './editor.component';
import { QuestionPreviewModule } from '../preview/preview.module';

@NgModule({
  declarations: [QuestionEditorComponent],
  imports: [SharedModule, QuestionPreviewModule],
  exports: [QuestionEditorComponent],
})
export class QuestionEditorModule {}
