export type Topic = {
  id: number
  name: string
  category: string
  logo_url: string
  cover_url: string
  description: string
}

export type Category = {
  name: string
  topics: Topic[]
}
