import withResults from '../mocks/with-results.json'
import withoutMovies from '../mocks/no-results.json'
import { useState } from 'react'

export function useMovies ({search}) {
    const [responseMovies, setResponseMovies] = useState([])


    const movies = responseMovies.Search
  
    //Vamos a mapear los datos de las movies, para evitar que un componente muy profundo
    //utilice la API;
    //De este modo, si cambiamos de API, solamente lo tendremos que cambiar en un solo sitio
    const mappedMovies = movies?.map(movie => ({
      id: movie.imdbID,
      title: movie.Title,
      year: movie.Year,
      poster: movie.Poster
    }))

    //Ahora, para hacerlo bien, en vez de usar el withresults o el withoutmovies, vamos a añadir
    //la URL de la API con la que estamos trabajando
    const getMovies = () => {
      if (search) {
        //setResponseMovies(withResults)
        fetch(`https://www.omdbapi.com/?apikey=4287ad07&s=${search}`)
          .then(res => res.json())
          .then(json => {
            setResponseMovies(json)
           })
      } else {
        //setResponseMovies(withoutMovies)
      }
    }
  
    return { movies: mappedMovies, getMovies }
  }
  