export const Routes = {
  merchant: {
    page: () => `/de`,
    cart: () => `/orders?tab=cart`,
    orders: () => `/orders?tab=orders`,
    info: () => `/info`,
  },
  explorer: {
    page: () => `/`,
    favorites: () => `/favourites`,
    topic: (id: string) => `/topics/${id}`,
    topicQuizzes: (id: string) => `/topics/${id}/quizzes`,
    topicLeaderboard: (id: string) => `/topics/${id}/leaderboard`,
  },
}
