import React from 'react'
import { Outlet } from 'react-router-dom'
import { Page } from 'zmp-ui'

import { PageContainer } from '@/components'
import { QuizLayout } from '@/modules/quiz/components/layout'

export default function QuizRootPage() {
  return (
    <QuizLayout>
      <Page restoreScroll className="bg-background section-container">
        <PageContainer>
          <Outlet />
        </PageContainer>
      </Page>
    </QuizLayout>
  )
}
