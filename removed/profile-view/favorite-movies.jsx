import React from "react";
import PropTypes from "prop-types";
import { Row, Col, Figure, Button } from "react-bootstrap";
//import { MovieCard } from "../movie-card/movie-card";
import "./profile-view.css";
import { Link } from "react-router-dom";

export const FavoriteMovies = ({ favoriteMovies }) => {
    return (
        <Card>
            <Card.Body>
                <Row>
                    <Col xs={12} >
                        <h2>My Favorite Movies</h2>
                    </Col>
                </Row>
                <Row>
                    {favoriteMovies.map((ImagePath, Title, Id) => {
                        return (
                            <Col key={Id} xs={12} md={6} lg={3} className="fav-movie">
                                <Figure>
                                    <Link to={`/movies/${id}`}>
                                        <Figure.Image
                                            src={ImagePath}
                                            alt={Title}
                                        />
                                        <Figure.Caption>
                                            {Tilte}
                                        </Figure.Caption>
                                    </Link>
                                </Figure>
                                <Button variant="secondary"
                                    onClick={() => removeFav(movies.id)}>
                                    Remove Movie
                                </Button>
                            </Col>
                        );
                    })}
                </Row>
            </Card.Body>
        </Card>
    );
};


FavoriteMovies.propTypes = {
    favoriteMovies: PropTypes.array.isRequired,
    user: PropTypes.object.isRequired,
};

/*<MovieCard
                                movie={movie}
                                isFavorite={user.favoriteMovies.includes(movie.title)}
                            /> */