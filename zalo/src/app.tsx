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
import FavouritesRootPage from './pages/favourites'
import QuizRootPage from './pages/quiz'
import TopicRootPage from './pages/topic'
import ProfileRootPage from './pages/profile'

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
                  <Route path="/profile" element={<ProfileRootPage />} />
                  <Route path="/favourites" element={<FavouritesRootPage />} />
                  <Route path="/topics" element={<ExplorerRootPage />} />
                  <Route path="/topics/:topicId" element={<TopicRootPage />}>
                    <Route path="/topics/:topicId/" element={<QuizList />} />
                    <Route path="/topics/:topicId/quizzes" element={<QuizList />} />
                    <Route path="/topics/:topicId/leaderboard" element={<TopicLeaderboard />} />
                  </Route>
                  <Route path="/quiz/:quizId" element={<QuizRootPage />}>
                    <Route path="/quiz/:quizId/player" element={<QuizPage />} />
                    <Route path="/quiz/:quizId/result" element={<QuizResultPage />} />
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
