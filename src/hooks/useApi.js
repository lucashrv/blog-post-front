import { useEffect, useState } from 'react';
import axios from "axios"

export function useApi(axiosParams){

    const [ data, setData ] = useState(null)
    const [ loading, setLoading ] = useState(true)
    const [ error, setError ] = useState(null)

    const fetchData = async (params) => {
      try {
        const result = await axios.request(params)
        setData(result.data)
      } catch( error ) {
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