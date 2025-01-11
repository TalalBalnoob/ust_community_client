import { comment, post } from './posts.type'

export interface staff {
  id: number
  user_id: number
  displayName: string
  role_id: number
  branch: string
  bio: null
  imageUrl: null
  created_at: string
  updated_at: string
  role: string
}

export interface student {
  id: number
  user_id: number
  displayName: string
  major_id: number
  level: number
  branch: string
  major: string
  bio: null
  imageUrl: null
  created_at: string
  updated_at: string
  role_id: number
}

export interface userProfile<t = student> {
  id: number
  username: number
  isAdmin: boolean
  user_type_id: number
  created_at: string
  updated_at: string
  following: number
  followers: number
  profile: t
  posts: post[]
  comments: comment[]
}
