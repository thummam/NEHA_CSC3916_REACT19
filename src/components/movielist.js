import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovies, setMovie, searchMovies } from "../actions/movieActions";
import { Link } from 'react-router-dom';
import { Image, Nav, Carousel } from 'react-bootstrap';
import { BsStarFill } from 'react-icons/bs';


function MovieList() {
  const dispatch = useDispatch();
  const movies = useSelector(state => state.movie.movies);
  const searchResults = useSelector(state => state.movie.searchResults);
  const [query, setQuery] = useState('');

  // Memoize movie list
  const memoizedMovies = useMemo(() => movies, [movies]);

  // Fetch all movies on mount
  useEffect(() => {
    dispatch(fetchMovies());
  }, [dispatch]);

  const handleSelect = (selectedIndex) => {
    dispatch(setMovie(memoizedMovies[selectedIndex]));
  };

  const handleClick = (movie) => {
    dispatch(setMovie(movie));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      dispatch(searchMovies(query));
    }
  };

  if (!memoizedMovies) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mt-4">

      {/* 🔍 Search Form */}
      <form onSubmit={handleSearch} style={{ marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Search movies or actors"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{ padding: '8px', width: '300px' }}
        />
        <button type="submit" style={{ padding: '8px 12px', marginLeft: '10px' }}>
          Search
        </button>
      </form>

      {/* 🎞 Carousel for All Movies */}
      <Carousel onSelect={handleSelect} className="bg-dark text-light p-4 rounded">
        {memoizedMovies.map((movie) => (
          <Carousel.Item key={movie._id}>
            <Nav.Link
              as={Link}
              to={`/movie/${movie._id}`}
              onClick={() => handleClick(movie)}
            >
              <Image className="image" src={movie.imageUrl} thumbnail />
            </Nav.Link>
            <Carousel.Caption>
              <h3>{movie.title}</h3>
              <BsStarFill /> {movie.avgRating} &nbsp;&nbsp; {movie.releaseDate}
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>

      {/* 📋 Search Results Grid */}
      {searchResults.length > 0 && (
        <div className="search-grid">
          {searchResults.map((movie) => (
            <div key={movie._id} className="movie-card">
              <h4>{movie.title}</h4>
              <p><strong>Genre:</strong> {movie.genre}</p>
              <p><strong>Actors:</strong> {movie.actors.join(', ')}</p>
              <Image src={movie.imageUrl} thumbnail width={150} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MovieList;
