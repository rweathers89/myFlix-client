import React from "react";
import { Row, Col, Figure, Button } from "react-bootstrap";
import { MovieCard } from "../movie-card/movie-card";
import "./profile-view.scss";
import { Link } from "react-router-dom";

export const FavouriteMovies = ({ user, favoriteMovies }) => {
    return (
        <Card className="card">
            <Card.Body>
                <Row>
                    <Col md={12} >
                        <h4>My Favorite Movies</h4>
                    </Col>
                </Row>
                <Row>
                    {favoriteMovies.map((ImagePath, Title, _id) => {
                        return (
                            <Col key={_id} xs={12} md={6} lg={3} className="fav-movie">
                                <Figure>
                                    <Link to={`/movies/${movie.title}`}>
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
                                    onClick={() => removeFav(movies._id)}>
                                    Remove
                                </Button>
                            </Col>
                        );
                    })}
                </Row>
            </Card.Body>
        </Card>
    )
}


/*<MovieCard
                                movie={movie}
                                isFavorite={user.favoriteMovies.includes(movie.title)}
                            /> */