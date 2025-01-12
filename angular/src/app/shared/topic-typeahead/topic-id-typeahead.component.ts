import { ChangeDetectionStrategy, Component, forwardRef } from '@angular/core';
import { map } from 'rxjs/operators';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { TopicTypeaheadComponent } from './topic-typeahead.component';

@Component({
  selector: 'app-topic-id-typeahead',
  templateUrl: './topic-typeahead.component.html',
  styles: `:host { position: relative }`,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TopicIdTypeaheadComponent),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TopicIdTypeaheadComponent extends TopicTypeaheadComponent {
  registerOnChange(fn: any): void {
    this.selected.pipe(map(s => s?.id)).subscribe(fn);
  }
}
