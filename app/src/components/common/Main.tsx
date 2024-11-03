import { useContext } from 'react'
import AuthContext from '../../contexts/AuthContext'
import Banner from '../banner/Banner'
import NewsList from '../news/NewsList'

const Main = () => {
  const { token } = useContext(AuthContext)
  
  return (
    <main className="flex-grow flex-col flex items-center p-8">
      {token ? <NewsList /> : <Banner />}
    </main>
  )
}

export default Main
