import React, { useState, useEffect } from 'react'
import useDebounce from './useDebounce'
import keys from './config/keys'
import './App.css'

export default function App() {
  const [searchTerm, setSearchTerm] = useState(''),
    [results, setResults] = useState([]),
    [isSearching, setIsSearching] = useState(false),
    debouncedSearchTerm = useDebounce(searchTerm, 500)

  useEffect(() => {
    if(debouncedSearchTerm){
      setIsSearching(true)
      searchCharacters(debouncedSearchTerm).then(res => {
        setIsSearching(false)
        setResults(res)
      })
    } else {
      setResults([])
    }
  }, [debouncedSearchTerm])

    return (
      <div className='App'>
        <input
          placeholder="Search Marvel Comics"
          onChange={e => setSearchTerm(e.target.value)}
        />

        {isSearching && <div>Searching ...</div>}

        {results.map(result => (
          <div key={result.id}>
            <h4>{result.title}</h4>
            <img
              alt='thumbnail'
              src={`${result.thumbnail.path}/portrait_incredible.${
                result.thumbnail.extension
              }`}
            />
          </div>
        ))}
      </div>
  )
}

async function searchCharacters(search) {
  try {
    const query = `apikey=${keys.apiKey}&titleStartsWith=${search}`
    const res = await fetch(`https://gateway.marvel.com/v1/public/comics?${query}`)
    const response = await res.json()
    return response.data.results
  } catch(err) {
    console.error(err)
    return []
  }
}
