import { useContext } from 'react'
import AuthContext from '../../contexts/AuthContext'
import { INews } from '../../interfaces'
import NewsItem from './NewsItem'
import { useJsonFetch } from '../../hooks/useJsonFetch'
import ViewError from '../common/ViewError'
const { VITE_BACKEND_URL: backendUrl } = import.meta.env

const NewsList = () => {
  const { token } = useContext(AuthContext)

  const {
    data: news,
    isLoading,
    error,
  } = useJsonFetch(`${backendUrl}/private/news`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })

  if (isLoading) {
    return <span className="loading loading-spinner loading-lg"></span>
  }

  if (news) {
    return (
      <>
        {error && <ViewError error={error} />}
        <section className="grid grid-cols-2 gap-x-10 gap-y-5 w-full max-w-5xl">
          {news.map((item: INews) => (
            <NewsItem key={item.id} item={item} />
          ))}
        </section>
      </>
    )
  }
}

export default NewsList
