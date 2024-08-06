import responseMovies from '../mocks/with-results.json'
import withoutMovies from '../mocks/no-results.json'

export function useMovies () {
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
  
    return { movies: mappedMovies }
  }
  