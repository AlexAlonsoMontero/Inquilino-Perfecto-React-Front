import { useState, useEffect } from 'react'

function useFetch(url) {
    const [results, setResults] = useState(false)

    useEffect(() => {
      const f = async () => {
          const res = await fetch(url)
          const data = await res.json()
          setResults(data)
          // console.log(data)
      }
      f()
    }, [url])

    return results
}

export default useFetch
    