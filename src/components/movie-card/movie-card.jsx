import React, { useEffect, useState } from "react";
// Here you import the PropTypes library
import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./movie-card.scss";

export const MovieCard = ({ movie, isFavorite, addFav, removeFav }) => {
    const add = () => addFav(movie.id);
    const remove = () => removeFav(movie.id);

    return (
        <>
            <Card className="h-100 moviecard">
                <Card.Body className="cardBody">
                    <Card.Text className="justify-content-md-center">
                        <Row className="justify-content-md-center">
                            <Col md={6} sm={12}
                                className="w-100">{isFavorite.includes(movie) ?
                                    (<Button onClick={remove}
                                        className="primaryButton mt-2">
                                        <p><FaHeart color="darkred" /></p>
                                    </Button>)
                                    : (<Button onClick={add}
                                        className="primaryButton mt-2">
                                        <p><FaRegHeart /></p>
                                    </Button>)}
                                <Link to={`/movies/${encodeURIComponent(movie.id)}`}>
                                    <Button
                                        variant="primary"
                                        className="primaryButton mt-2">
                                        INFO
                                    </Button>
                                </Link>
                            </Col>
                        </Row>
                    </Card.Text>
                </Card.Body>

                <Card.Img variant="top" src={movie.image} className="moviePoster" />
            </Card>
        </>
    );
};

// Here is where we define all the props constraints for the MovieCard
MovieCard.propTypes = {
    book: PropTypes.shape({
        title: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
        director: PropTypes.string.isRequired,
        genre: PropTypes.string.isRequired,
        description: PropTypes.string
    }).isRequired
};

/*
export const MovieCard = ({ movie, isFavorite }) => {
    const storedToken = localStorage.getItem("token");
    const storedUser = JSON.parse(localStorage.getItem("user"));

    const [user, setUser] = useState(storedUser ? storedUser : null);
    const [token, setToken] = useState(storedToken ? storedToken : null);

    const [addTitle, setAddTitle] = useState("");
    const [delTitle, setDelTitle] = useState("");

    //add movies to Favorite
    useEffect(() => {
        const addtoFavorites = () => {
            fetch(`movie-api-nj6m.onrender.com/users/${user.UserName}/movies/${encodeURIComponent(movie.title)}`,
                {
                    method: "POST",
                    //body: JSON.stringify(favoriteMovies),
                    headers: {
                        "Authorizaion": `Bearer ${storedToken}`,
                        "Content-Type": "application/json"
                    }
                },
            )
                .then((response) => {
                    if (response.ok) {
                        alert("Movie added to favorites successfully!");
                        window.location.reload();

                        return response.json()
                    }
                    alert("Failed to add movie to favorites");
                })
                .then((user) => {
                    if (user) {
                        localStorage.setItem("user", JSON.stringify(user));
                        setUser(user)
                    }
                })
                .catch((error) => {
                    console.error(error);
                });
        };
    }); // END useEffect

    const removeFromFavorites = () => {
        fetch(`movie-api-nj6m.onrender.com/users/${user.UserName}/movies/${encodeURIComponent(movie.title)}`,
            {
                method: "DELETE",
                //body: JSON.stringify(favoriteMovies),
                headers: {
                    "Authorizaion": `Bearer ${storedToken}`,
                    "Content-Type": "application/json"
                }
            },
        )

            .then((response) => {
                if (response.ok) {
                    alert("Movie removed from favorites successfully!");
                    window.location.reload();

                    return response.json()
                }
                alert("Failed to remove movie from favorites");
            })

            .then((user) => {
                if (user) {
                    localStorage.setItem("user", JSON.stringify(user));
                    setUser(user);
                }
            })

            .catch((error) => {
                console.error(error);
            });
    };

    const handleAddToFavorites = () => {
        setAddTitle(movie.title);
    };
    const handleRemoveFromFavorites = () => {
        setDelTitle(movie.title);
    };

    if (addTitle) {
        addToFavorites();
    }

    if (delTitle) {
        removeFromFavorites();
    }

}, [addTitle, delTitle, token]; //END removeFromFavorites


return (
    <>
        <Link to={`/movies/${encodeURIComponent(movie.id)}`} className="movie-view">
            <Card className="h-100">
                <Card.Img variant="top" src={movie.image} />
                <Card.Body>
                    <Card.Title>{movie.title}</Card.Title>
                    <Card.Text>{movie.director}</Card.Text>
                </Card.Body>
            </Card>
        </Link>

        <Card>
            {isFavorite ? (
                <Button
                    onClick={() => onClick(handleRemoveFromFavorites)}
                    vairant="primary">
                    Remove
                </Button>
            ) : (
                <Button
                    onClick={() => onClick(handleAddToFavorites)}
                    vairant="primary">
                    Add
                </Button>
            )}
        </Card>
    </>
);
};
*/




// The MovieCard function component
/*export const MovieCard = ({ movie, onMovieClick }) => {
    return (
        <div
            onClick={() => {
                onMovieClick(movie);
            }}
        >
            {movie.title}
        </div>
    );
}; */