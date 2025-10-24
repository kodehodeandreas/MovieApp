import MovieCard from "../components/MovieCard";
import { useState, useEffect } from "react";
import { searchMovies, getPopularMovies } from "../services/api";
import "../css/Home.css";
import curtain from "../assets/curtain.jpg";

function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSearching, setIsSearching] = useState(false);

  const loadPopularMovies = async () => {
    setLoading(true);
    setError(null);
    try {
      const popularMovies = await getPopularMovies();
      setMovies(popularMovies || []);
      setIsSearching(false);
    } catch {
      setError("Failed to load popular movies");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPopularMovies();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    setLoading(true);
    setError(null);
    setIsSearching(true);

    try {
      const results = await searchMovies(searchQuery);
      if (results && results.length > 0) setMovies(results);
      else {
        setMovies([]);
        setError("No movies found");
      }
    } catch {
      setError("Failed to search for movies");
    } finally {
      setLoading(false);
      setSearchQuery("");
    }
  };

  const handleClearSearch = () => {
    loadPopularMovies();
  };

  return (
    <div className="Home">
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          placeholder="Search for movies..."
          className="search-input"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button type="submit" className="search-button">
          Search
        </button>
        {isSearching && (
          <button
            type="button"
            className="clear-button"
            onClick={handleClearSearch}
          >
            Back to popular
          </button>
        )}
      </form>

      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}

      <div className="movies-grid">
        {movies.map((movie) => (
          <MovieCard movie={movie} key={movie.id} />
        ))}
      </div>
    </div>
  );
}

export default Home;
