export function ListOfMovies ({ movies }) {
    //<ul> para tener una lista desordenada
    return (
            <ul>
              {
                movies.map(movie => (
                  <li key={movie.imdbID}>
                    <h3>{movie.title}</h3>
                    <p>{movie.year}</p>
                    <img src={movie.poster} alt={movie.title} />
                  </li>
                ))
              }
            </ul>
        )
}

export function NoMoviesResults () {
    return (
        <p>No se encontraron peliculas para esta busqueda</p>
    )
}


export function Movies ({ movies }){
  //Le pasamos los movies mediante props
  const hasMovies = movies?.length > 0
    return (
            hasMovies 
              ? <ListOfMovies movies={movies}/>
              : <NoMoviesResults />    
    )
}