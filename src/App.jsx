import './App.css'
//useRef es un hook que permite crear una referencia mutable que persiste durante
//todo el ciclo de vida del componente; cada vez que cambia no vuelve a renderizar
//el componente (a diferencia del useState que si lo hace)
//import { useRef } from 'react'
import { useMovies } from './hooks/useMovies'
import { Movies } from './components/Movies'
import { useState, useEffect, useRef, useCallback } from 'react'

import debounce from 'just-debounce-it' //Hemos instalado npm install just-debounce-it -E 
//Vamos a hacer un debounce del getMovies en handleChange; queremos evitar que se haga la busqueda
//hasta que sea necesario; creamos la funcion debounceGetMovies para usarla en el handleChange

//Custom hook = extraer logica de los componentes
function useSearch() {
  const [search, updateSearch] = useState('')
  const [error, setError] = useState(null)
  const isFirstInput = useRef(true)

  useEffect(() => {
    if (isFirstInput.current) {
      isFirstInput.current = search === ''
      return
    }

    if (search === '') {
      setError('No se puede buscar una pelicula vacia')
      return
    }
  
    if (search.match(/^\d+$/)) {
      setError('No se puede buscar una pelicula con un numero')
      return
    }
  
    if (search.length < 3) {
      setError('La busqueda debe tener al menos 3 caracteres')
      return
    }
  
    setError(null)
  }, [search])

  return { search, updateSearch, error }
}

function App() {
  const [sort, setSort] = useState(false)

  const {search, updateSearch, error} = useSearch()
  const {movies: mappedMovies, loading, getMovies} = useMovies({search, sort})
  //const inputRef = useRef() //RECOMENDACION; Intentar no abusar de las referencias

    const debounceGetMovies = useCallback(
    debounce(search => {
      console.log('search', search)
      getMovies({ search })
    }, 300) //Milisegundos que queremos que tarde en cargar la info;
    , []
    )

     const handleSubmit = (event) => {
      event.preventDefault()
      //En este punto, se pueden meter condiciones; si la query es vacia, entonces tal...
      getMovies({ search })
    }


    const handleSort = () => {
      setSort(!sort)
    }

    const handleChange = (event) => {
      //De este modo, usando newQuery, nos aseguramos que utilizamos siempre la ultima
      const newSearch = event.target.value
      updateSearch(event.target.value)
      debounceGetMovies(newSearch)
      //Asi, cada vez que hay un cambio en el input, hara la busqueda de forma automatica
    }

    useEffect(() => {
      console.log('new getMovies received')
    }, [getMovies]) //cada vez que se escribe en el search, se crea una funcion que queda logeada en el console log
 

  return (
    <div className='page'>

      <header>
        <h1>Buscador de peliculas</h1>
        <form className='form' onSubmit={handleSubmit}>
          <input 
            style={{
              border: '1px solid transparent',
              borderColor: error ? 'red' : 'transparent'
            }} 
            onChange={handleChange} 
            value={search} 
            name='query' 
            placeholder='Avengers, 
            simpsons...' 
            />
            <input type='checkbox' onChange={handleSort} checked={sort} />
          <button type='submit'>Search</button>
        </form>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </header>

      <main>
        {
          loading ? <p>Cargando . . .</p> : <Movies movies={mappedMovies}/>
        }
      </main>
    </div>
  )
}


export default App
