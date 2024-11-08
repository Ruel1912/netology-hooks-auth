import './App.css'
import { useEffect, useState } from 'react'
import AuthContext from './contexts/AuthContext'
import Header from './components/common/Header'
import Main from './components/common/Main'
import { useJsonFetch } from './hooks/useJsonFetch'
import ViewError from './components/common/ViewError'
import Loading from './components/common/Loading'
const { VITE_BACKEND_URL: backendUrl } = import.meta.env

function App() {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem('token')
  )
  const [profile, setProfile] = useState<string | null>(
    localStorage.getItem('profile')
  )

  const [profileData, loadingProfile, errorProfile] = useJsonFetch(
    token && !profile ? `${backendUrl}/private/me` : '',
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }
  )

  useEffect(() => {
    if (profileData) {
      const profileString = JSON.stringify(profileData)
      localStorage.setItem('profile', profileString)
      setProfile(profileString)
    }
  }, [profileData])

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token)
    } else {
      localStorage.removeItem('token')
      localStorage.removeItem('profile')
      setToken(null)
      setProfile(null)
    }
  }, [token])

  if (loadingProfile) {
    return <Loading />
  }

  return (
    <>
      {errorProfile && <ViewError error={errorProfile} />}
      <AuthContext.Provider value={{ token, setToken, profile, setProfile }}>
        <Header />
        <Main />
      </AuthContext.Provider>
    </>
  )
}

export default App
