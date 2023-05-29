import { useEffect, useState } from 'react';
import axios from "axios"

export function useApi(axiosParams) {

  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchData = async (params) => {
    try {
      const result = await axios.request(params)
      setData(result.data)
    } catch (error) {
      setError(error)
    } finally {
      setLoading(false)
    }
  };

  useEffect(() => {
    fetchData(axiosParams)
  }, [])

  return { data, error, loading }
}

export const useAxios = (configObj) => {

  const {
    axiosInstance,
    method,
    url,
    requestConfig = {}
  } = configObj

  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const controller = new AbortController()

    const fetchData = async () => {
      try {
        const res = await axiosInstance[method.toLowerCase()](url, {
          ...requestConfig,
          signal: controller.signal
        })
        console.log(res)
        setData(res.data)
      } catch (err) {
        console.log(err.message)
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchData()

    //useEffect cleanup function
    return () => controller.abort()
  }, [])

  return [ data, loading, error ]
}