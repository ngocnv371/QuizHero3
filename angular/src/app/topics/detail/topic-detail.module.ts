import { NgModule } from '@angular/core';

import { TopicDetailRoutingModule } from './topic-detail-routing.module';
import { TopicDetailComponent } from './topic-detail.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { TopicFormModalModule } from '../form/topic-form-modal.module';

@NgModule({
  declarations: [TopicDetailComponent],
  imports: [SharedModule, TopicDetailRoutingModule, TopicFormModalModule],
})
export class TopicDetailModule {}
