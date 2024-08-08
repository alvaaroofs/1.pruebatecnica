import { useState, useMemo, useRef, useCallback } from 'react'
import { searchMovies } from '../services/movies'

//useCallback es lo mismo que el useMemo, pero pensado para una funcion
//Con useCallback acortaremos mas codigo que con useMemo, pero viene a ser lo mismo
//ya que useCallback utiliza useMemo por debajo

export function useMovies ({search, sort}) {
    const [movies, setMovies] = useState([])
    const [loading, setLoading] = useState([false])
    const [error, setError] = useState(null)
    //Ahora, vamos a usar useRef() para guardar la busqueda anterior
    const previousSearch = useRef(search)

    //Para evitar que el getMovies se este continuamente creando y destruyendo:
    //
    const getMovies = useCallback(async ({ search }) => { //Le pasamos el search como parametro
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
  }, []) //cada vez que cambia el search, se ejecutara la funcion de getMovies
  
    /*const getSortedMovies = () => {
    //CheckBox que las ordene por titulo
    console.log('getSortedMovies')
    const sortedMovies = sort
      ? [...movies].sort((a, b) => a.title.localeCompare(b.title))
      : movies

      return sortedMovies
    }*/


  //Con esta logica siguiente, hasta que no se le da a search, no renderiza nada;
  //useMemo() en este caso, es para poder memorizar computaciones que hemos hecho que queremos evitar que se hagan
  //a no ser que se cambien las dependencias que nosotros le hemos dado


  //useMemo no solo funciona con computaciones, tambien con funciones
    const sortedMovies = useMemo(() => {
        //console.log('memoSortedMovies')

        return sort
        ? [...movies].sort((a, b) => a.title.localeCompare(b.title))
         : movies
      }, [sort, movies])
    

    return { movies: sortedMovies, getMovies, loading }
  }
  