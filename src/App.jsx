import './App.css'
//useRef es un hook que permite crear una referencia mutable que persiste durante
//todo el ciclo de vida del componente; cada vez que cambia no vuelve a renderizar
//el componente (a diferencia del useState que si lo hace)
//import { useRef } from 'react'
import { useMovies } from './hooks/useMovies'
import { Movies } from './components/Movies'

function App() {

  const {movies: mappedMovies} = useMovies()
  //const inputRef = useRef() //RECOMENDACION; Intentar no abusar de las referencias

  const handleSubmit = (event) => {
      event.preventDefault()
      const { query } = Object.fromEntries(
        new window.FormData(event.target)
      )
      //En este punto, se pueden meter condiciones; si la query es vacia, entonces tal...
      console.log({ query })
  }

  return (
    <div className='page'>
      <header>
        <h1>Buscador de peliculas</h1>
      <form className='form>' onSubmit={handleSubmit}>
        <input name='query' placeholder='Avengers, simpsons...' />
        <button type='submit'>Search</button>
      </form>
      </header>

      <main>
        <Movies movies={mappedMovies}/>
      </main>
    </div>
  )
}


export default App
