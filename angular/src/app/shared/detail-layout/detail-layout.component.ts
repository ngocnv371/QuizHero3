import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-detail-layout',
  templateUrl: './detail-layout.component.html',
})
export class DetailLayoutComponent {
  @Input()
  header!: string;

  @Input()
  tooltip!: string;
}
