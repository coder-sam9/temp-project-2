import React, { useState } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const fetchMovies = async () => {
    let response = await fetch("https://swapi.dev/api/films/");
    const data = await response.json();
    const movieList = data.results.slice(0, 10).map((item) => {
      return {
        key: item.title + item.release_date,
        title: item.title,
        releaseDate: item.release_date,
        openingText: item.opening_text,
      };
    });
    setMovies(movieList);
  };

  return (
    <React.Fragment>
      <section>
        <button onClick={() => fetchMovies()}>Fetch Movies</button>
      </section>
      <section>
        <MoviesList movies={movies} />
      </section>
    </React.Fragment>
  );
}

export default App;
