import { post } from './posts.type'

export interface postPage {
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

export interface Activity {
  id: string
  type: string
  notifiable_type: string
  notifiable_id: number
  data: {
    type: 'like' | 'comment' | 'follow'
    username?: string
    user_id?: string
    post_id?: string
  }
  read_at: string | null
  created_at: string
  updated_at: string
}
