import { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

//Components
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { ProfileView } from "../profile-view/profile-view";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import { MoviesList } from "../movies-list/movies-list";

//Redux
import { useSelector, useDispatch } from "react-redux";
import { setMovies } from "../../redux/reducers/movies";

export const MainView = () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedToken = localStorage.getItem("token");
    //const [movies, setMovies] = useState([]);

    //Redux
    const user = useSelector((state) => state.user);
    const movies = useSelector((state) => state.movies.list);


    const dispatch = useDispatch();

    //const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);

    useEffect(() => {
        if (!token) {
            return;
        }

        fetch("https://movie-api-nj6m.onrender.com/movies", {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then((response) => response.json())
            .then((movies) => {
                setMovies(movies);
                console.log(data);
                const moviesFromApi = data.docs.map((doc) => {
                    return {
                        id: doc.key,
                        title: doc.title,
                        // change url to myMovie Mix API link
                        image: `ImageURL`,
                        director: doc.director?.[0],
                    };
                });

                dispatch(setMovies(moviesFromApi));
                localStorage.setItem("movies", JSON.stringify(movies));
                console.log("movies from api:", data);
            });
    }, [token]); //END useEffect (!token)


    return (
        <BrowserRouter>
            <NavigationBar
                user={user}
                onLoggedOut={() => {
                    setUser(null);
                    setToken(null);
                    localStorage.clear();
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
                                {!user ? <Navigate to="/login" replace /> : <MoviesList />}
                            </>
                        }
                    />
                    <Route
                        path="/profile"
                        element={
                            <>
                                {!user ? (
                                    <Navigate to="/login" replace />
                                ) : (
                                    <Col md={8}>
                                        <ProfileView localUser={user} movies={movies} token={token} />
                                    </Col>
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
const handleSearch = (e) => {

        const query = e.target.value;
        setSearchQuery(query);

        //Filter movies by title, genre or director
        const filteredMovies = movies.filter((movie) => {
            return (
                movie.title.toLowerCase().includes(query.toLowerCase())
                ||
                movie.genre.toLowerCase().includes(query.toLowerCase())
                ||
                movie.director.toLowerCase().includes(query.toLowerCase())
            );
        })
        setMovies(filteredMovies);
    }


   return (
        <BrowserRouter>
            <NavigationBar
                user={user}
                query={query}
                handleSearch={handleSearch}
                movies={movies}
                onLoggedOut={() => {
                    setUser(null);
                    setToken(null);
                    localStorage.clear();
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
                                ) : <LoginView
                                    onLoggedIn={(user, token) => {
                                        setUser(user);
                                        setToken(token);
                                    }}
                                />
                                }
                            </>
                        }
                    />
                    <Route
                        path="/movies/:movieId"
                        element={
                            <>
                                {!user ? (
                                    <Navigate to="/login" replace />
                                ) : movies.length === 0 ?
                                    <Col>The list is empty!</Col>
                                    : <MovieView
                                        movies={movies}
                                        token={token}
                                        user={user}
                                        updatedUser={updatedUser}
                                    />}
                            </>
                        }
                    />
                    <Route
                        path="/"
                        element={
                            <>
                                {!user ? <Navigate to="/login" replace /> : <MoviesList />}
                            </>
                        }
                    />

                    <Route
                        path="/profile"
                        element={
                            <>
                                {user ? (
                                    <Navigate to="/login" replace />
                                ) : (<ProfileView
                                    user={user}
                                    token={token}
                                    movies={movies}
                                    onLoggedOut={() => {
                                        setUser(null);
                                        setToken(null);
                                        localStorage.clear();
                                    }}
                                    updatedUser={updatedUser}
                                />)
                                }
                            </>
                        }
                    />
                </Routes>
            </Row>
        </BrowserRouter>
    );
};
        
*/