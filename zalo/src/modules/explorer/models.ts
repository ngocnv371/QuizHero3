export type TopicDto = {
  id: string
  name: string
  category: string
  avatarUrl: string
  coverUrl: string
  description: string
}

export type Category = {
  name: string
  topics: TopicDto[]
}
