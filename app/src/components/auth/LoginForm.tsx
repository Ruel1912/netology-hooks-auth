import { useContext, useRef, useState } from 'react'
import AuthContext from '../../contexts/AuthContext'
import ViewError from '../common/ViewError'
const { VITE_BACKEND_URL: backendUrl } = import.meta.env

const LoginForm = () => {
  const { setToken, setProfile } = useContext(AuthContext)
  const [error, setError] = useState<string | null>(null)

  const formRef = useRef<HTMLFormElement>(null)
  const handleClick = (e: React.FormEvent) => {
    e.preventDefault()
    if (formRef.current) {
      const formData = new FormData(formRef.current)
      const data = Object.fromEntries(formData.entries())
      authorization(data)
    }
  }

  const getUser = (token: string) => {
    setError(null)
    fetch(`${backendUrl}/private/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setProfile(JSON.stringify(data))
        localStorage.setItem('profile', JSON.stringify(data))
      })
      .catch((e) => console.error(e))
  }

  const authorization = async (data: Record<string, FormDataEntryValue>) => {
    try {
      setError(null)
      const response = await fetch(`${backendUrl}/auth/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error((await response.json())?.message || response.statusText)
      }

      const { token } = await response.json()
      setToken(token)
      localStorage.setItem('token', token)
      getUser(token)
    } catch (error) {
      if (error instanceof SyntaxError) {
        setError('Response is not valid JSON')
      } else {
        setError(error.message || 'Network error')
      }
    }
  }

  return (
    <>
      {error && <ViewError error={error} />}
      <form
        method="POST"
        onSubmit={(e) => handleClick(e)}
        className="flex gap-4 items-center justify-end w-full"
        ref={formRef}
      >
        <input
          name="login"
          type="text"
          placeholder="UserName"
          autoComplete="username"
          className="input input-bordered input-md max-w-xs w-full"
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          autoComplete="current-password"
          className="input input-bordered input-md max-w-xs w-full"
        />
        <button className="btn btn-outline btn-success" type="submit">
          Login
        </button>
      </form>
    </>
  )
}

export default LoginForm
