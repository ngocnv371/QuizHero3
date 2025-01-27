import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React, { Suspense } from 'react'
import { Route } from 'react-router-dom'
import { AnimationRoutes, App, SnackbarProvider, ZMPRouter } from 'zmp-ui'

import { RootProvider } from './components'
import { UserLoader } from './modules/auth/components/user-loader'
import { TopicLeaderboard } from './modules/leaderboard/components/topic-leaderboard'
import { QuizPage } from './modules/quiz/components/quiz-page'
import { QuizResultPage } from './modules/quiz/components/result-page'
import QuizList from './modules/topic/components/quiz-list'
import ExplorerRootPage from './pages/explorer'
import HistoryRootPage from './pages/history'
import QuizRootPage from './pages/quiz'
import TopicRootPage from './pages/topic'
import ProfileRootPage from './pages/profile'
import ProfileLocationPage from './pages/profile/location'
import ProfileSecurityPage from './pages/profile/security'
import ProfilePrivacyPage from './pages/profile/privacy'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
    },
  },
})

const MyApp = () => {
  console.log('render app')
  return (
    <App>
      <Suspense>
        <QueryClientProvider client={queryClient}>
          <SnackbarProvider>
            <RootProvider>
              <ZMPRouter>
                <UserLoader />
                <AnimationRoutes>
                  <Route path="/" element={<ExplorerRootPage />} />
                  <Route path="/profile">
                    <Route index element={<ProfileRootPage />} />
                    <Route path="location" element={<ProfileLocationPage />} />
                    <Route path="security" element={<ProfileSecurityPage />} />
                    <Route path="privacy" element={<ProfilePrivacyPage />} />
                  </Route>
                  <Route path="/history" element={<HistoryRootPage />} />
                  <Route path="/topics">
                    <Route index element={<ExplorerRootPage />} />
                    <Route path=":topicId" element={<TopicRootPage />}>
                      <Route index element={<QuizList />} />
                      <Route path="quizzes" element={<QuizList />} />
                      <Route path="leaderboard" element={<TopicLeaderboard />} />
                    </Route>
                  </Route>
                  <Route path="/quiz/:quizId" element={<QuizRootPage />}>
                    <Route index element={<QuizPage />} />
                    <Route path="player" element={<QuizPage />} />
                    <Route path="result" element={<QuizResultPage />} />
                  </Route>
                </AnimationRoutes>
              </ZMPRouter>
            </RootProvider>
          </SnackbarProvider>
        </QueryClientProvider>
      </Suspense>
    </App>
  )
}
export default MyApp
