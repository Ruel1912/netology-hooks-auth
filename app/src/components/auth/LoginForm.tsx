import { useContext, useEffect, useState } from 'react'
import AuthContext from '../../contexts/AuthContext'
import ViewError from '../common/ViewError'
import { useJsonFetch } from '../../hooks/useJsonFetch'
import Loading from '../common/Loading'
const { VITE_BACKEND_URL: backendUrl } = import.meta.env

const LoginForm = () => {
  const { profile, setToken } = useContext(AuthContext)
  const [loginData, setLoginData] = useState<Record<
    string,
    FormDataEntryValue
  > | null>(null)

  const [tokenData, isLoadingToken, errorToken] = useJsonFetch(
    loginData ? `${backendUrl}/auth/` : '',
    loginData
      ? {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(loginData),
        }
      : undefined
  )

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget as HTMLFormElement)
    const data = Object.fromEntries(formData.entries())
    setLoginData(data)
  }

  useEffect(() => {
    if (tokenData && tokenData.token) {
      setToken(tokenData.token)
      localStorage.setItem('token', tokenData.token)
    }
  }, [tokenData, setToken])

  return (
    <>
      {errorToken && <ViewError error={errorToken} />}
      <form
        method="POST"
        onSubmit={handleSubmit}
        className="flex gap-4 items-center justify-end w-full"
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
          {!profile && isLoadingToken ? <Loading /> : null}
        </button>
      </form>
    </>
  )
}

export default LoginForm
