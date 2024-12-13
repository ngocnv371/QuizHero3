import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, catchError, throwError } from 'rxjs';
import { TopicFormModalComponent } from '../form/topic-form-modal.component';
import { TopicDto, TopicsService } from '@proxy/quiz';

@Component({
  selector: 'app-topic-detail',
  templateUrl: './topic-detail.component.html',
  styleUrl: './topic-detail.component.scss',
})
export class TopicDetailComponent implements OnInit {
  @ViewChild(TopicFormModalComponent)
  formModal!: TopicFormModalComponent;

  topicId: string;
  topic = {} as TopicDto;
  isLoading = false;

  constructor(route: ActivatedRoute, private service: TopicsService) {
    this.topicId = route.snapshot.params.topicId;
  }

  ngOnInit() {
    this.reload();
  }

  reload(): void {
    this.isLoading = true;
    this.service
      .get(this.topicId)
      .pipe(
        catchError(error => {
          this.isLoading = false;
          return throwError(() => error);
        })
      )
      .subscribe(v => {
        this.topic = v;
        this.isLoading = false;
      });
  }

  onSaved() {
    this.reload();
  }

  onTopicUpdated(updatedTopic: TopicDto) {
    this.topic = updatedTopic;
  }
}
