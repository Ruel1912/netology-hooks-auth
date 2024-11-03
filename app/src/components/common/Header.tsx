import { useContext } from 'react'
import LoginForm from '../auth/LoginForm'
import AuthContext from '../../contexts/AuthContext'
import Logout from '../auth/Logout'

const Header = () => {

  const { token } = useContext(AuthContext)

  return (
    <header className="flex justify-between items-center gap-4 p-4 bg-slate-100">
      <h1 className="text-2xl font-medium text-nowrap">Neto Social</h1>
      {token ? <Logout /> : <LoginForm />}
    </header>
  )
}

export default Header
