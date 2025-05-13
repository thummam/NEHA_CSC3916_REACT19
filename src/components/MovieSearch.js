import React, { useState } from 'react';
import axios from 'axios';
import './MovieSearch.css'; // optional for styling

const MovieSearch = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [error, setError] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token'); // assuming token is stored here
      const response = await axios.post(
        'http://localhost:8080/movies/search',
        { query },
        {
          headers: {
            Authorization: token,
            'Content-Type': 'application/json'
          }
        }
      );

      setResults(response.data.results);
      setError('');
    } catch (err) {
      console.error(err);
      setError('Search failed. Try again.');
      setResults([]);
    }
  };

  return (
    <div>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search movies or actors..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <div className="grid-container">
        {results.map((movie) => (
          <div className="movie-card" key={movie._id}>
            <h3>{movie.title}</h3>
            <p><strong>Genre:</strong> {movie.genre}</p>
            <p><strong>Actors:</strong> {movie.actors.join(', ')}</p>
            <img src={movie.imageUrl} alt={movie.title} width="150" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieSearch;
