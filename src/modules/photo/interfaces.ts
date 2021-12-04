export interface PhotoI {
  id: string
  created_at: Date
  updated_at: Date
  promoted_at?: any
  width: number
  height: number
  color: string
  blur_hash: string
  description?: any
  alt_description: string
  urls: object
  links: object
  categories: any[]
  likes: number
  liked_by_user: boolean
  current_user_collections: any[]
  sponsorship: object
  topic_submissions: object
  user: object
}
