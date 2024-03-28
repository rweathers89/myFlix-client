import { useEffect, useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { NavigationBar } from "../navigation-bar/navigation-bar";

export const MainView = () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedToken = localStorage.getItem("token");
    const [user, setUser] = useState(storedUser ? storedUser : null);
    const [token, setToken] = useState(storedToken ? storedToken : null);
    const [movies, setmovies] = useState([]);
    //const [selectedMovie, setSelectedMovie] = useState(null);

    useEffect(() => {
        if (!token) {
            return;
        }

        fetch("movie-api-nj6m.onrender.com/movies", {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("Movies data: ", data);
                const moviesFromApi = data.docs.map((doc) => {
                    return {
                        id: doc.key,
                        title: doc.title,
                        //add image link here
                        image: ``,
                        author: doc.author_name?.[0],
                    };
                });

                setMovies(moviesFromApi);
                console.log("movies from api:", data);
            });
    }, [token]);

    return (
        <BrowserRouter>
            <NavigationBar user={user}
                onLoggedOut={() => {
                    setUser(null);
                    setToken(null)
                    localStorage.clear()
                }}
            />
            <Row className="justify-content-md-center">
                <Routes>
                    <Route
                        path="/signup"
                        element={
                            <>
                                {user ? (
                                    <Navigate to="/" />
                                ) : (
                                    <Col md={5}>
                                        <SignupView />
                                    </Col>
                                )}
                            </>
                        }
                    />
                    <Route
                        path="/login"
                        element={
                            <>
                                {user ? (
                                    <Navigate to="/" />
                                ) : (
                                    <Col md={5}>
                                        <LoginView onLoggedIn={(user) => setUser(user)} />
                                    </Col>
                                )}
                            </>
                        }
                    />
                    <Route
                        path="/movies/:movieId"
                        element={
                            <>
                                {!user ? (
                                    <Navigate to="/login" replace />
                                ) : movies.length === 0 ? (
                                    <Col>The list is empty!</Col>
                                ) : (
                                    <Col md={8}>
                                        <MovieView movies={movies} />
                                    </Col>
                                )}
                            </>
                        }
                    />
                    <Route
                        path="/"
                        element={
                            <>
                                {!user ? (
                                    <Navigate to="/login" replace />
                                ) : movies.length === 0 ? (
                                    <Col>The list is empty!</Col>
                                ) : (
                                    <>
                                        {movies.map((movie) => (
                                            <Col className="mb-4" key={movie.id} md={3}>
                                                <MovieCard movie={movie} />
                                            </Col>
                                        ))}
                                    </>
                                )}
                            </>
                        }
                    />
                </Routes>
            </Row>
        </BrowserRouter>
    );
};


/*
{
    !user ? (
        <Col md={5}>
            <LoginView onLoggedIn={(user) => setUser(user)} />
            or
            <SignupView />
        </Col>
    ) : selectedMovie ? (
        <Col md={8}>
            <MovieView
                movie={selectedMovie}
                onBackClick={() => setSelectedMovie(null)}
            />
        </Col>
    ) : movies.length === 0 ? (
        <div>The list is empty!</div>
    ) : (
    <>
        {movies.map((movie) => (
            <Col className="mb-5" key={movie.id} md={3}>
                <MovieCard
                    movie={movie}
                    onMovieClick={(newSelectedMovie) => {
                        setSelectedMovie(newSelectedMovie);
                    }}
                />
            </Col>
        ))}
    </>
)
}
*/