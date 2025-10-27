import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import "../css/MovieCard.css";
import { Heart, X } from "lucide-react";

function MovieCard({ movie, isFavoritePage, onRemove }) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [showFullOverview, setShowFullOverview] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const imageUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "https://via.placeholder.com/500x750?text=No+Image";

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  const overviewLimit = 100;
  const toggleOverview = () => setShowFullOverview((prev) => !prev);

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setIsFavorite(favorites.some((fav) => fav.id === movie.id));
  }, [movie.id]);

  function onFavoriteClick() {
    const existingFavorites =
      JSON.parse(localStorage.getItem("favorites")) || [];
    const isAlreadyFavorite = existingFavorites.some(
      (fav) => fav.id === movie.id
    );

    if (isAlreadyFavorite) {
      const updatedFavorites = existingFavorites.filter(
        (fav) => fav.id !== movie.id
      );
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
      setIsFavorite(false);
    } else {
      const updatedFavorites = [...existingFavorites, movie];
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
      setIsFavorite(true);
    }
  }

  function onRemoveClick() {
    const existingFavorites =
      JSON.parse(localStorage.getItem("favorites")) || [];
    const updatedFavorites = existingFavorites.filter(
      (fav) => fav.id !== movie.id
    );
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    if (onRemove) onRemove();
  }

  const displayedOverview = showFullOverview
    ? movie.overview
    : movie.overview?.slice(0, overviewLimit) +
      (movie.overview?.length > overviewLimit ? "..." : "");

  return (
    <>
      <div className="movie-card">
        <div className="movie-poster">
          <img src={imageUrl} alt={movie.title} />
          <div className="movie-overlay">
            {isFavoritePage ? (
              <button className="favorite-btn remove" onClick={onRemoveClick}>
                Remove
              </button>
            ) : (
              <button
                className={`favorite-btn ${isFavorite ? "active" : ""}`}
                onClick={onFavoriteClick}
              >
                <Heart
                  size={24}
                  color={isFavorite ? "#ff0000" : "#ffffff"}
                  fill={isFavorite ? "#ff0000" : "none"}
                />
              </button>
            )}
          </div>
        </div>

        <div className="movie-info">
          <h3>{movie.title}</h3>
          <p>{movie.release_date}</p>
          {movie.vote_average && (
            <p className="user-rating">⭐ {movie.vote_average.toFixed(1)}</p>
          )}
          {movie.overview && (
            <p>
              {movie.overview.slice(0, overviewLimit)}{" "}
              {movie.overview.length > overviewLimit && (
                <button className="read-more-btn" onClick={openModal}>
                  Les mer...
                </button>
              )}
            </p>
          )}
        </div>
      </div>

      {showModal &&
        createPortal(
          <div className="movie-modal">
            <div className="modal-content">
              <button className="close-modal" onClick={closeModal}>
                <X size={20} />
              </button>
              <h2>{movie.title}</h2>
              <p className="modal-release">{movie.release_date}</p>
              <p>{movie.overview}</p>
            </div>
          </div>,
          document.body
        )}
    </>
  );
}

export default MovieCard;
