import './App.css'
//useRef es un hook que permite crear una referencia mutable que persiste durante
//todo el ciclo de vida del componente; cada vez que cambia no vuelve a renderizar
//el componente (a diferencia del useState que si lo hace)
//import { useRef } from 'react'
import { useMovies } from './hooks/useMovies'
import { Movies } from './components/Movies'
import { useState, useEffect, useRef } from 'react'

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

     const handleSubmit = (event) => {
      event.preventDefault()
      //En este punto, se pueden meter condiciones; si la query es vacia, entonces tal...
      getMovies()
    }


    const handleSort = () => {
      setSort(!sort)
    }

    const handleChange = (event) => {
      //De este modo, usando newQuery, nos aseguramos que utilizamos siempre la ultima
      updateSearch(event.target.value)
    }
 

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
