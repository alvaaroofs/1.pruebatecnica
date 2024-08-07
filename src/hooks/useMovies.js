import { useRef } from 'react'
import { useState } from 'react'
import { searchMovies } from '../services/movies'

export function useMovies ({search, sort}) {
    const [movies, setMovies] = useState([])
    const [loading, setLoading] = useState([false])
    const [error, setError] = useState(null)
    //Ahora, vamos a usar useRef() para guardar la busqueda anterior
    const previousSearch = useRef(search)

    const getMovies = async () => {
      if (search === previousSearch.current) return
      
      try {
        setLoading(true)
        setError(null)
        previousSearch.current = search 
        const newMovies = await searchMovies( { search } )
        setMovies(newMovies)
      }catch (e) {
        setError(e.message)
      } finally {
        //El finally se va a ejecutar, tanto si se cumple el try, como si se cumple el
        //catch simultaneamente; tambien se podria dejar metido la linea de setLoading(false)
        //dentro del catch, pero aqui si tendria sentido dejarlo metido dentro del finally
        setLoading(false)
      }
    }
  
    //CheckBox que las ordene por titulo
    /*const sortedMovies = sort
      ? [...movies].sort(a, b) => a.title.locale*/

    return { movies, getMovies, loading }
  }
  