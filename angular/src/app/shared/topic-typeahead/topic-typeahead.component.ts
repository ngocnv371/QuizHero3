import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  Output,
  ViewChild,
  forwardRef,
} from '@angular/core';
import {
  NgbTypeahead,
  NgbTypeaheadSelectItemEvent,
} from '@ng-bootstrap/ng-bootstrap/typeahead/typeahead';
import { Observable, OperatorFunction, ReplaySubject, Subject, merge, of } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  map,
  filter,
  tap,
  switchMap,
  catchError,
} from 'rxjs/operators';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { TopicLookupDto, TopicsService } from '@proxy/quiz';

@Component({
  selector: 'app-topic-typeahead',
  templateUrl: './topic-typeahead.component.html',
  styles: `:host { position: relative }`,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TopicTypeaheadComponent),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TopicTypeaheadComponent implements ControlValueAccessor, OnInit {
  searching = false;
  searchFailed = false;
  model: TopicLookupDto;

  @ViewChild('instance', { static: true }) instance: NgbTypeahead;
  focus$ = new Subject<string>();
  click$ = new Subject<string>();

  @Input()
  label?: string;

  @Output()
  readonly selected = new ReplaySubject<TopicLookupDto>(1);

  formatter = (state: TopicLookupDto) => state.name;

  constructor(private service: TopicsService) {}

  writeValue(topic: TopicLookupDto | string): void {
    if (typeof topic === 'string') {
      if (!topic) {
        return;
      }

      this.searching = true;
      this.service.get(topic).subscribe({
        next: v => {
          this.searching = false;
          this.model = v as any;
          this.instance.writeValue(v);
        },
        error: v => {
          this.searching = false;
          this.searchFailed = true;
        },
      });
    } else {
      this.model = topic;
    }
  }

  registerOnChange(fn: any): void {
    this.selected.subscribe(fn);
  }

  onTouched: () => void = () => {};
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  disabled = false;
  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  ngOnInit(): void {
    console.debug('topic typeahead');
  }

  handleSelect(event: NgbTypeaheadSelectItemEvent) {
    this.selected.next(event.item);
  }

  clear() {
    this.model = null;
    this.selected.next(null);
  }

  search: OperatorFunction<string, TopicLookupDto[]> = (text$: Observable<string>) => {
    const debouncedText$ = text$.pipe(debounceTime(200), distinctUntilChanged());
    const clicksWithClosedPopup$ = this.click$.pipe(filter(() => !this.instance.isPopupOpen()));
    const inputFocus$ = this.focus$;

    return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).pipe(
      debounceTime(200),
      distinctUntilChanged(),
      tap(() => (this.searching = true)),
      switchMap(term =>
        this.service.getLookup(term).pipe(
          tap(() => (this.searchFailed = false)),
          map(t => t.items),
          catchError(error => {
            this.searchFailed = true;
            return of([]);
          })
        )
      ),
      tap(() => (this.searching = false))
    );
  };
}
