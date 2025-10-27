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
    <div className="Favorites">
      <h2>Your Favorites</h2>
      {favorites.length === 0 && <p>No favorites yet.</p>}
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
  );
}

export default Favorites;
