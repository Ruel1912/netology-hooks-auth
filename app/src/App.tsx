import './App.css'
import { useState } from 'react'
import AuthContext from './contexts/AuthContext'
import Header from './components/common/Header'
import Main from './components/common/Main'

function App() {
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'))
  const [profile, setProfile] = useState<string | null>(localStorage.getItem('profile'))
  
  return (
    <AuthContext.Provider value={{ token, setToken, profile, setProfile }}>
      <Header />
      <Main />
    </AuthContext.Provider>
  )
}

export default App
