import React from "react";
import PropTypes from "prop-types";
import { Row, Col, Button } from "react-bootstrap";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "./movie-view.css";

//import { MovieCard } from "../movie-card/movie-card";
//import { Button, Row, Col } from "react-bootstrap";
//import { useSelector, useDispatch } from "react-redux";

export const MovieView = ({ movies, Username, user, updateUser }) => {
    //Redux
    //const movies = useSelector((state) => state.movies.list);
    //const dispatch = useDispatch();

    //get movieId from the URL
    const { movieId } = useParams();
    //find movie by movieID
    const movie = movies.find((movie) => movie._id === movieId);
    const navigate = useNavigate();
    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
        if (
            user &&
            user.FavoriteMovies &&
            user.FavoriteMovies.includes(movie._id)
        ) {
            setIsFavorite(true);
        } else {
            setIsFavorite(false);
        }

    }, [user, movie]);

    const addToFavorites = (event) => {
        event.preventDefault();
        const token = localStorage.getItem("token");
        if (!movie || !Username) {
            console.error(
                "Selected movie or Username not found",
                movie,
                Username,
                user
            );
            return;
        }
        fetch(
            `https://movie-api-nj6m.onrender.com/users/${Username}/movies/${movie._id}`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            }
        )
            .then((response) => {
                if (!response) {
                    console.error("No response received");
                    return;
                }
                if (!response.ok) {
                    console.error(`HTTP error! Status: ${response.status}`);
                    return;
                }
                return response.json();
            })
            .then((data) => {
                localStorage.setItem("user", JSON.stringify(data));
                setIsFavorite(true); // Update the state after a successful API response
                if (data && data.Username) {
                    alert("Movie ADDED to Favorites List");
                    updateUser(data);
                }
            })
            .catch((error) => {
                console.error("Error adding movie to favorites:", error);
            });
    };

    const rmvFromFavorites = (event) => {
        event.preventDefault();
        const token = localStorage.getItem("token");
        if (!movie || !Username) {
            console.error("Selected movie or Username not found");
            return;
        }
        fetch(
            `https://movie-api-nj6m.onrender.com/users/${Username}/movies/${movie._id}`,
            {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            }
        )
            .then((response) => {
                if (!response) {
                    console.error("No response received");
                    return;
                }
                if (!response.ok) {
                    console.error(`HTTP error! Status: ${response.status}`);
                    return;
                }
                return response.json();
            })
            .then((data) => {
                localStorage.setItem("user", JSON.stringify(data));
                setIsFavorite(false); // Update the state after a successful API response
                if (data && data.Username) {
                    alert("Movie REMOVED from Favorites List");
                    updateUser(data);
                }
            })
            .catch((error) => {
                console.error("Error adding movie to favorites:", error);
            });
    };


    return (
        <>
            <Row className="my-3 justify-content-md-center">
                <Col md={12}>
                    <img src={movie.ImagePath} className="w-100" />
                </Col>
                <Col md={12} className="col-12">
                    <div className="my-1">
                        <span className="h3">Title: </span>
                        <span className="h3">{movie.Title}</span>
                    </div>
                    <div className="my-1">
                        <span className="h6">Description: </span>
                        <span>{movie.Description}</span>
                    </div>
                    <div className="my-1">
                        <span className="h6">Genre: </span>
                        <span>{movie.Genre.Name}</span>
                    </div>
                    <div className="my-1">
                        <span className="h6">Director: </span>
                        <span>{movie.Director.Name}</span>
                    </div>
                    <div className="my-1">
                        <span className="h6">Featured: </span>
                        <span>{movie.Featured ? "Yes" : "No"}</span>
                    </div>
                    <Button
                        className="my-1"
                        style={{ cursor: "pointer" }}
                        onClick={() => navigate(-1)}
                    >
                        Back
                    </Button>
                    {isFavorite ? (
                        <Button
                            variant="primary"
                            className="mt-auto"
                            onClick={rmvFromFavorites}
                        >
                            Remove from Favorites
                        </Button>
                    ) : (
                        <Button
                            variant="primary"
                            className="mt-auto"
                            onClick={addToFavorites}
                        >
                            Add to Favorites
                        </Button>
                    )}
                </Col>
            </Row>
        </>
    );
};

// Here is where we define all the props constrainst for MovieView
/*
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
*/
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