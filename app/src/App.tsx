import './App.css'
import { useEffect, useState } from 'react'
import AuthContext from './contexts/AuthContext'
import Header from './components/common/Header'
import Main from './components/common/Main'

function App() {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem('token')
  )
  const [profile, setProfile] = useState<string | null>(
    localStorage.getItem('profile')
  )

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token)
    } else {
      localStorage.removeItem('token')
    }
  }, [token])

  useEffect(() => {
    if (profile) {
      localStorage.setItem('profile', profile)
    } else {
      localStorage.removeItem('profile')
    }
  }, [profile])

  return (
    <AuthContext.Provider value={{ token, setToken, profile, setProfile }}>
      <Header />
      <Main />
    </AuthContext.Provider>
  )
}

export default App
