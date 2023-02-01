export interface PostType {
  _id?: string
  _createdAt?: string
  title?: string
  description?: string
  author?: AuthorType
  mainImage?: ImageType
  slug?: SlugType
  body?: object[]
  comments?: CommentType[]
}
export interface AuthorType {
  name: string
  image: ImageType
}
export interface SlugType {
  current: string
}
export interface ImageType {
  asset: {
    _ref: string
  }
}
export interface CommentType {
  _id: string
  _createdAt: string
  _updatedAt: string
  approved: boolean
  comment: string
  email: string
  name: string
  post: {
    _ref: string
  }
}
