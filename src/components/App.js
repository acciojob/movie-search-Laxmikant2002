
import React, { useState } from "react";
import './../styles/App.css';

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState("");

  const API_KEY = "99eb9fd1";

  const searchMovies = async () => {
    if (!searchTerm.trim()) {
      setError("Invalid movie name. Please try again.");
      setMovies([]);
      return;
    }

    try {
      const response = await fetch(
        `https://www.omdbapi.com/?apikey=${API_KEY}&s=${searchTerm}`
      );
      const data = await response.json();

      if (data.Response === "True") {
        setMovies(data.Search);
        setError("");
      } else {
        setMovies([]);
        setError("Invalid movie name. Please try again.");
      }
    } catch (err) {
      setMovies([]);
      setError("Invalid movie name. Please try again.");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      searchMovies();
    }
  };

  return (
    <div>
        {/* Do not remove the main div */}
        <div className="search-container">
          <h1>Search Movie</h1>
          <div className="search-bar">
            <input
              type="text"
              placeholder="Enter movie name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <button onClick={searchMovies}>Search</button>
          </div>
        </div>

        {error && <div className="error">{error}</div>}

        <div className="movies-container">
          {movies.map((movie) => (
            <div key={movie.imdbID} className="movie-card">
              <img
                src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/300x450?text=No+Poster"}
                alt={movie.Title}
              />
              <h3>{movie.Title}</h3>
              <p>{movie.Year}</p>
            </div>
          ))}
        </div>
    </div>
  )
}

export default App
