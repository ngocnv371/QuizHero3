import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { QuestionPreviewComponent } from './preview.component';

@NgModule({
  declarations: [QuestionPreviewComponent],
  imports: [SharedModule],
  exports: [QuestionPreviewComponent],
})
export class QuestionPreviewModule {}
