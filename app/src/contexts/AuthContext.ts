import { createContext } from 'react'
import { IAuthContext } from '../interfaces'

const AuthContext = createContext<IAuthContext>({
  token: null,
  profile: null,
  setToken: () => {},
  setProfile: () => {},
})

export default AuthContext