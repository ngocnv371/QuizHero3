import { AuditedEntityDto } from '@abp/ng.core';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-audit-card',
  templateUrl: './audit-card.component.html',
})
export class AuditCardComponent {
  @Input({ required: true })
  info = {} as AuditedEntityDto;
}
