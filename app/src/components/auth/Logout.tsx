import { useContext } from 'react'
import AuthContext from '../../contexts/AuthContext'

const Logout = () => {

  const { profile, setToken } = useContext(AuthContext)
  
  const logout = () => {
    setToken(null)
  }

  const userData = profile ? JSON.parse(profile) : null

  return (
    <div className="flex gap-2 items-center">
      <p>Hello, {userData?.name ?? 'User'}</p>

      <div className="avatar">
        <div className="w-10 rounded-full">
          <img
            src={userData?.avatar ?? 'https://i.pravatar.cc/40'}
            alt={'user avatar'}
          />
        </div>
      </div>

      <button
        onClick={logout}
        className="btn btn-outline btn-error"
        type="button"
      >
        Logout
      </button>
    </div>
  )
}

export default Logout
