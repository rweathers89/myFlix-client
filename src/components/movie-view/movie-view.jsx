import React from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { MovieCard } from "..movie-card/movie-card";

import { Button, Row, Col } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import "./movie-view.scss";

export const MovieView = ({ movies }) => {
    //Redux
    const movies = useSelector((state) => state.movies.list);
    const dispatch = useDispatch();
    //get movieId from the URL
    const { movieId } = useParams();
    //find movie by movieID
    const movie = movies.find((m) => m.id === movieId);

    /*
    //Find similar movies based on genre
    const similarMovies = movies.filter((m) => {
        return (
            m.id !== movie.id &&
            m.genre.some((genre) => movie.genre.includes(genre))
        )
    });
    */

    return (
        <div>
            <div>
                <img src={movie.image} height={300} alt="Movie Poster" />
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

/*
            <Col classname="mb-5">
                <hr />
                <h3 className="title">Similar Movies</h3>
                <Row>
                    {similarMovies.map((movie) => (
                        <Col key={movie.id} xs={6} sm={6} md={6}>
                            <MovieCard movie={movie} />
                        </Col>
                    ))
                    }
                </Row>
            </Col>
            */