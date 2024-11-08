import { useState, useEffect } from 'react'

export const useJsonFetch = (url: string, opts: RequestInit = {}) => {
  const [data, setData] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      setError(null)

      try {
        const response = await fetch(url, opts)

        if (!response.ok) {

          if (response.status === 401) {
            throw new Error('Unauthorized')
          }
          throw new Error((await response.json())?.message || response.statusText)
        }

        const data = await response.json()
        setData(data)

      } catch (error) {
        if (error instanceof SyntaxError) {
          setError('Response is not valid JSON')
        } else {
          if (error instanceof Error) {
            setError(error.message || 'Network error')
          }
        }
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [url])

  return [data, isLoading, error]
}
