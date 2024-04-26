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



export const MainView = () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedToken = localStorage.getItem("token");
    const [user, setUser] = useState(storedUser ? storedUser : null);
    const [token, setToken] = useState(storedToken ? storedToken : null);
    const [movies, setMovies] = useState([]);
    const [searchBar, setSearchBar] = useState("");


    useEffect(() => {
        if (!token) return;

        fetch("https://movie-api-nj6m.onrender.com/movies", {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then((response) => response.json())
            .then((data) => {
                const moviesFromApi = data.map((movie) => {
                    return {
                        _id: movie._id,
                        Title: movie.Title,
                        Description: movie.Description,
                        Genre: {
                            Name: movie.Genre.Name,
                            Description: movie.Genre.Description,
                        },
                        Director: {
                            Name: movie.Director.Name,
                            Bio: movie.Director.Bio,
                            Birth: movie.Director.Birth,
                            Death: movie.Director.Death,
                        },
                        ImagePath: movie.ImagePath,
                        Featured: movie.Featured,
                    };
                });
                setMovies(moviesFromApi);
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
    /*
        const handleSearch = (e) => {
    
            const query = e.target.value;
            setQuery(query);
    
            const storedMovies = JSON.parse(localStorage.getItem("movies"));
    
            //Filter movies by title and genre
            const filteredMovies = storedMovies.filter((movie) => {
                return (
    
                    movie.title.toLowerCase().includes(searchBar.toLowerCase()) ||
                    movie.genre.some((genre) => genre.toLowerCase().includes(query.toLowerCase()))
                );
            })
    
            setMovies(filteredMovies);
        }
    */

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
            <Row className="justify-content-md-center my-5">
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
                        path="movies/:movieId"
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
                        path="/profile"
                        element={
                            <>
                                {!user ? (
                                    <Navigate to="/login" replace />
                                ) : (
                                    <Col md={8}>
                                        <ProfileView
                                            user={user}
                                            movies={movies}
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
                                                sm={12}
                                                md={6}
                                                lg={4}
                                                xl={3}
                                                xxl={2}
                                            >
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
REDUX

//Redux
//import { useSelector, useDispatch } from "react-redux";
//import { setMovies } from "../../redux/reducers/movies";
//const user = useSelector((state) => state.user);
    //const movies = useSelector((state) => state.movies.list);
    //const dispatch = useDispatch();
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

 <Route 
        path="/profile" 
        element={
          <Row className="justify-content-center">
          <Col 
          sm={12} md={9} lg={7}
           >
          {user ? (
          <ProfileView
            token={token}
            user={user}
            movies={movies}
            onSubmit={(user) => setUser(user)}
          />) : (<Navigate to="/login" />)
          } 
        </Col>
        </Row>
        }
        />
        
*/