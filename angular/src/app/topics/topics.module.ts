import { NgModule } from '@angular/core';

import { TopicsRoutingModule } from './topics-routing.module';
import { TopicsComponent } from './topics.component';
import { SharedModule } from '../shared/shared.module';
import { TopicFormModalModule } from './form/topic-form-modal.module';

@NgModule({
  declarations: [TopicsComponent],
  imports: [TopicsRoutingModule, SharedModule, TopicFormModalModule],
})
export class TopicsModule {}
