import { NewsItemProps } from '../../interfaces'

const NewsItem = ({ item }: NewsItemProps) => {
  return (
    <article className="card card-compact bg-base-100 w-full shadow-xl">
      <figure className="min-h-60 bg-slate-400 max-h-60">
        <img src={item.image} alt={'article image'} />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{item.title}</h2>
        <p>{item.content}</p>
      </div>
    </article>
  )
}

export default NewsItem
