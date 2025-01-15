export const Routes = {
  merchant: {
    page: () => `/de`,
    cart: () => `/orders?tab=cart`,
    orders: () => `/orders?tab=orders`,
    info: () => `/info`,
  },
  explorer: {
    page: () => `/`,
    favorites: () => `/favorites`,
    topic: (id: number) => `/topics/${id}`,
    topicQuizzes: (id: number) => `/topics/${id}/quizzes`,
    topicLeaderboard: (id: number) => `/topics/${id}/leaderboard`,
  },
}
