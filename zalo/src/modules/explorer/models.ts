export type TopicDto = {
  id: string
  name: string
  category: string
  logo_url: string
  cover_url: string
  description: string
}

export type Category = {
  name: string
  topics: TopicDto[]
}
