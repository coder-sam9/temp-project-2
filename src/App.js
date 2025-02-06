import React, { useState, useEffect } from "react";
import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isRetrying, setIsRetrying] = useState(false);
  const [error, setError] = useState(null);

  const fetchMovies = async () => {
    setError(null);
    setMovies([]);
    setIsLoading(true);
    setIsRetrying(false);

    try {
      const response = await fetch("https://swapi.dev/api/films/");
      if (!response.ok) {
        throw new Error(`Something went wrong`);
      }
      const data = await response.json();
      const movieList = data.results.slice(0, 10).map((item) => ({
        key: item.title + item.release_date,
        title: item.title,
        releaseDate: item.release_date,
        openingText: item.opening_text,
      }));
      setMovies(movieList);
    } catch (err) {
      console.error("Fetch error:", err);
      setError(err.message);
      setIsRetrying(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isRetrying) {
      const retryDelay = 5000; 
      const retryTimer = setTimeout(() => {
        fetchMovies();
      }, retryDelay);

      return () => clearTimeout(retryTimer);
    }
  }, [isRetrying]);

  let content = <p>No Movies Found</p>;
  if (isLoading) {
    content = <p>Loading...</p>;
  }
  if (error) {
    content = (
      <p>
        Something went wrong...{isRetrying && <span style={{ fontWeight: "bold" }}> Retrying</span>}
      </p>
    );
  }
  if (!isLoading && !error && movies.length > 0) {
    content = <MoviesList movies={movies} />;
  }

  return (
    <React.Fragment>
      <section>
        {isRetrying ? (
          <button onClick={() => setIsRetrying(false)}>Cancel Retry</button>
        ) : (
          <button onClick={fetchMovies}>Fetch Movies</button>
        )}
      </section>
      <section>{content}</section>
    </React.Fragment>
  );
}

export default App;