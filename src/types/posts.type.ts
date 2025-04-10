import { staff, student, userProfile } from './userProfile.type'

export interface post {
  id: number
  user_id: number
  title: null | string
  body: string
  attachment_url: null
  created_at: string
  updated_at: string
  isLiked: boolean
  likes: number
  profile: student | staff
  comments: comment[]
}

export interface comment {
  id: number
  user_id: number
  post_id: number
  body: string
  attachment_url: null
  created_at: string
  updated_at: string
  user: userProfile<student | staff>
}
