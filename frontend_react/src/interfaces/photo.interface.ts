export interface PhotoI {
  id: string
  created_at: string
  updated_at: string
  promoted_at?: any
  width: number
  height: number
  color: string
  blur_hash: string
  description?: any
  alt_description: string | null
  urls: any
  links: any
  categories: any[]
  likes: number
  liked_by_user: boolean
  current_user_collections: any[]
  sponsorship: any
  topic_submissions: any
  user: any
}
