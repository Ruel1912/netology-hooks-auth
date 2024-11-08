import { Dispatch, SetStateAction } from 'react'

export interface INews {
  id: number
  title: string
  image: string
  content: string
}

export interface NewsItemProps {
  item: INews
}

export interface IAuthContext {
  token: string | null
  setToken: Dispatch<SetStateAction<string | null>>
  profile: string | null
  setProfile: Dispatch<SetStateAction<string | null>>
}