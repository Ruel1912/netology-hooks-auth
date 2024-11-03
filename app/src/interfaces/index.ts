export interface INews {
  id: number
  title: string
  image: string
  content: string
}

export interface NewsItemProps {
  item: INews
}