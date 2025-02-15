export const Routes = {
  merchant: {
    page: () => `/de`,
    cart: () => `/orders?tab=cart`,
    orders: () => `/orders?tab=orders`,
    info: () => `/info`,
  },
  explorer: {
    page: () => `/`,
  },
  history: {
    page: () => `/history`,
  },
  topic: {
    page: (id: number) => `/topics/${id}`,
    quizzes: (id: number) => `/topics/${id}/quizzes`,
    leaderboard: (id: number) => `/topics/${id}/leaderboard`,
  },
  quiz: {
    player: (quizId: string) => `/quiz/${quizId}/player`,
    result: (quizId: string) => `/quiz/${quizId}/result`,
  },
  profile: {
    page: () => `/profile`,
    locationSetting: () => `/profile/location`,
    privacySetting: () => `/profile/privacy`,
    securitySetting: () => `/profile/security`,
  },
}
