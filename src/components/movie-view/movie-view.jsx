import React from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router";
import { Link } from "react-router-dom";

//import { MovieCard } from "../movie-card/movie-card";

//import { Button, Row, Col } from "react-bootstrap";
//import { useSelector, useDispatch } from "react-redux";
import "./movie-view.css";

export const MovieView = ({ movies }) => {
    //Redux
    //const movies = useSelector((state) => state.movies.list);
    //const dispatch = useDispatch();

    //get movieId from the URL
    const { movieId } = useParams();
    //find movie by movieID
    const movie = movies.find((m) => m.id === movieId);


    return (
        <div>
            <div>
                <img src={movie.image} />
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
    movies: PropTypes.shape({
        title: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
        director: PropTypes.string.isRequired,
        genre: PropTypes.string.isRequired,
        description: PropTypes.string
    }).isRequired,
    onBackClick: PropTypes.func.isRequired,
};

/*
 <div>
                <img src={movie.image} />
            </div>            

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