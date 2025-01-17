import { authGuard, permissionGuard } from '@abp/ng.core';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule),
  },
  {
    path: 'account',
    loadChildren: () => import('@abp/ng.account').then(m => m.AccountModule.forLazy()),
  },
  {
    path: 'identity',
    loadChildren: () => import('@abp/ng.identity').then(m => m.IdentityModule.forLazy()),
  },
  {
    path: 'tenant-management',
    loadChildren: () =>
      import('@abp/ng.tenant-management').then(m => m.TenantManagementModule.forLazy()),
  },
  {
    path: 'setting-management',
    loadChildren: () =>
      import('@abp/ng.setting-management').then(m => m.SettingManagementModule.forLazy()),
  },
  {
    path: 'quizzes',
    loadChildren: () => import('./quizzes/quizzes.module').then(m => m.QuizzesModule),
  },
  {
    path: 'quizzes/:quizId',
    loadChildren: () => import('./quizzes/detail/quiz-detail.module').then(m => m.QuizDetailModule),
  },
  {
    path: 'topics',
    loadChildren: () => import('./topics/topics.module').then(m => m.TopicsModule),
  },
  {
    path: 'topics/:topicId',
    loadChildren: () =>
      import('./topics/detail/topic-detail.module').then(m => m.TopicDetailModule),
  },
  {
    path: 'questions',
    loadChildren: () => import('./questions/questions.module').then(m => m.QuestionsModule),
  },
  {
    path: 'questions/:questionId',
    loadChildren: () =>
      import('./questions/detail/question-detail.module').then(m => m.QuestionDetailModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {})],
  exports: [RouterModule],
})
export class AppRoutingModule {}
