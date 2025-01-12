import { CoreModule } from '@abp/ng.core';
import { NgbDropdownModule, NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { NgModule } from '@angular/core';
import { ThemeSharedModule } from '@abp/ng.theme.shared';
import { NgxValidateCoreModule } from '@ngx-validate/core';
import { DetailLayoutComponent } from './detail-layout/detail-layout.component';
import { TopicIdTypeaheadComponent } from './topic-typeahead/topic-id-typeahead.component';
import { TopicTypeaheadComponent } from './topic-typeahead/topic-typeahead.component';
import { AuditCardComponent } from './audit-card/audit-card.component';

@NgModule({
  declarations: [
    DetailLayoutComponent,
    TopicIdTypeaheadComponent,
    TopicTypeaheadComponent,
    AuditCardComponent,
  ],
  imports: [
    CoreModule,
    ThemeSharedModule,
    NgbDropdownModule,
    NgbTypeaheadModule,
    NgxValidateCoreModule,
  ],
  exports: [
    CoreModule,
    ThemeSharedModule,
    NgbDropdownModule,
    NgxValidateCoreModule,
    DetailLayoutComponent,
    TopicIdTypeaheadComponent,
    TopicTypeaheadComponent,
    AuditCardComponent,
  ],
  providers: [],
})
export class SharedModule {}
