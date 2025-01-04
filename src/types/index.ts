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
  user: student | staff
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
  user: student | staff
}

export interface student {
  id: number
  user_id: number
  displayName: string
  role_id: number
  branch: string
  bio: null
  imageUrl: null
  created_at: string
  updated_at: string
}

export interface staff {
  id: number
  user_id: number
  displayName: string
  major_id: number
  level: number
  branch: string
  bio: null
  imageUrl: null
  created_at: string
  updated_at: string
  role_id: number
}

export interface userProfile {
  id: number
  username: number
  isAdmin: boolean
  user_type_id: number
  created_at: string
  updated_at: string
  following: number
  followers: number
  profile: student | staff
  posts: post[]
  comments: comment[]
}
