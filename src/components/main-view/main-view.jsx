import { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

//Components
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { ProfileView } from "../profile-view/profile-view";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import { MovieCard } from "../movie-card/movie-card";

//Redux
//import { useSelector, useDispatch } from "react-redux";
//import { setMovies } from "../../redux/reducers/movies";

export const MainView = () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedToken = localStorage.getItem("token");
    const [movies, setMovies] = useState([]);
    const [user, setUser] = useState(storedUser ? storedUser : null);
    const [token, setToken] = useState(storedToken ? storedToken : null);
    const [searchBar, setSearchBar] = useState("");
    //Redux
    //const user = useSelector((state) => state.user);
    //const movies = useSelector((state) => state.movies.list);
    //const dispatch = useDispatch();


    useEffect(() => {
        if (!token) return;

        fetch("https://movie-api-nj6m.onrender.com/movies", {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then((response) => response.json())
            .then((data) => {
                // setMovies(movies);
                console.log(data);
                const moviesFromApi = data.map((movie) => {
                    return {
                        _id: movie._id,
                        Title: movie.Title,
                        Description: movie.Description,
                        Genre: {
                            Name: movie.Genre,
                            Description: movie.Genre.Decription
                        },
                        // change url to myMovie Mix API link

                        Director: {
                            Name: movie.Director,
                            Bio: movie.Director.Bio
                        },
                        Image: movie.ImagePath,
                        Featured: movie.Featured,
                    };
                });
                //redux
                //dispatch(setMovies(moviesFromApi));
                setMovies(moviesFromApi);
                // localStorage.setItem("movies", JSON.stringify(movies));
                console.log("movies from api:", data);
            });
    }, [token]); //END useEffect (!token)


    const updateUser = (updatedUser) => {
        setUser(updatedUser);
        localStorage.setItem("user", JSON.stringify(updatedUser));
    };

    const handleSearchBarReset = () => {
        setSearchBar("");
    };

    const filteredMovies = movies.filter(
        (movie) =>
            searchBar.trim() === "" ||
            movie.Title.toLowerCase().includes(searchBar.toLowerCase())
    );


    return (
        <BrowserRouter>
            <NavigationBar
                user={user}
                onLoggedOut={() => {
                    setUser(null);
                    localStorage.removeItem("token");
                    localStorage.removeItem("user");
                }}
                searchBar={searchBar}
                setSearchBar={setSearchBar}
                handleSearchBarReset={handleSearchBarReset}
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
                                    <Col sm={6} md={4}>
                                        <SignupView />
                                    </Col>
                                )}
                            </>
                        }
                    />
                    <Route
                        path="/return-signup"
                        element={
                            <>
                                <Col sm={6} md={4}>
                                    <SignupView />
                                </Col>
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
                                    <Col sm={6} md={4}>
                                        <LoginView
                                            onLoggedIn={(user, token) => {
                                                setUser(user);
                                                setToken(token);
                                            }}
                                        />

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
                                        <MovieView
                                            movies={movies}
                                            Username={user.Username}
                                            user={user}
                                            updateUser={updateUser}
                                        />
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
                                        {filteredMovies.map((movie) => (
                                            <Col
                                                className="mb-3"
                                                key={movie._id}
                                                md={3}>
                                                <MovieCard movie={movie} />
                                            </Col>
                                        ))}
                                    </>
                                )}
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
                                        <ProfileView
                                            user={user}
                                            updateUser={updateUser}
                                            //localUser={user} 
                                            movies={movies}
                                        //token={token} 
                                        />
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
                        path="/movies"
                        element={
                            <>
                                {!user ? (
                                    <Navigate to="/login" replace />
                                ) : movies.length === 0 ? (
                                    <Col>The list is empty!</Col>
                                ) : (
                                    <Col md={8}>
                                        <MoviesList movies={movies} />
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