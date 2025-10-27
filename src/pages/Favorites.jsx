import { useState, useEffect } from "react";
import MovieCard from "../components/MovieCard";
import "../css/Favorites.css";

function Favorites() {
  const [favorites, setFavorites] = useState([]);

  const loadFavorites = () => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(storedFavorites);
  };

  useEffect(() => {
    loadFavorites();
  }, []);

  return (
    <div className="favorites-page">
      {" "}
      <div className="favorites">
        <h2>Your Favorites</h2>

        {favorites.length === 0 && (
          <div className="favorites-empty">
            <h2>No favorites yet</h2>
            <p>Add some movies to see them here!</p>
          </div>
        )}

        <div className="movies-grid">
          {favorites.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              isFavoritePage={true}
              onRemove={loadFavorites}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Favorites;
