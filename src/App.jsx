import { useEffect, useState } from 'react'
import './App.css'

export function App() {
  const [fact, setFact] = useState()
  const [imageUrl, setImageUrl] = useState()
  const urlCatFacs = 'https://catfact.ninja/fact'
  const urlCatAAs = 'https://cataas.com'

  //Recuperar cita
  useEffect(() => {
    fetch(urlCatFacs)
      .then((res) => res.json())
      .then((data) => {
        const { fact } = data
        setFact(fact)
      })
  }, [])

  //recuperar imagen
  useEffect(() => {
    if(!fact) return
    const threeFirstWords = fact.split(' ', 3).join(' ')
    fetch(
      `${urlCatAAs}/cat/says/${threeFirstWords}?size=50&
          color=red&json=true`)
      .then(res => res.json())
      .then(data => {
        const { url } = data
        setImageUrl(url)
      })
  }, [fact])

  return (
    <main>
      <h1>App gatitos</h1>
      {fact && <p>{fact}</p>}
      {imageUrl && <img src={urlCatAAs + imageUrl} alt='cat image' />}
    </main>
  )
}
