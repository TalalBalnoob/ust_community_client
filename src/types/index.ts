import { post } from './posts.type'

export interface getPostsType {
  posts: dataPage
}

interface dataPage {
  current_page: number
  data: post[]
  first_page_url: string
  from: number
  last_page: number
  last_page_url: string
  links: Link[]
  next_page_url: string
  path: string
  per_page: number
  prev_page_url: null
  to: number
  total: number
}

interface Link {
  url: null | string
  label: string
  active: boolean
}
