import { useParams } from "react-router";
import { Link } from "react-router-dom";
//import PropTypes from "prop-types";
import "./movie-view.scss";

export const MovieView = ({ movies }) => {
    const { movieId } = useParams();

    const movie = movies.find((b) => b.id === movieId);

    return (
        <div>
            <div>
                <img src={movie.image} className="w-100" />
            </div>
            <div>
                <span>Title: </span>
                <span>{movie.title}</span>
            </div>
            <div>
                <span>Director: </span>
                <span>{movie.director}</span>
            </div>
            <div>
                <span>Genre: </span>
                <span>{movie.genre}</span>
            </div>
            <div>
                <span>Description: </span>
                <span>{movie.description}</span>
            </div>
            <Link to={`/`}>
                <button
                    onClick={onBackClick}
                    className="back-button"
                    style={{ cursor: "pointer" }}
                >
                    Back
                </button>
            </Link>
        </div>
    );
};

// Here is where we define all the props constrainst for MovieView
MovieView.propTypes = {
    book: PropTypes.shape({
        title: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
        director: PropTypes.string.isRequired,
        genre: PropTypes.string.isRequired,
        description: PropTypes.string
    }).isRequired,
    onBackClick: PropTypes.func.isRequired,
};