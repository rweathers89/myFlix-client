import { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

//Components
//import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { ProfileView } from "../profile-view/profile-view";
import { MoviesList } from "../movies-List/movies-list";
import { NavigationBar } from "../navigation-bar/navigation-bar";


//Redux
import { useSelector, useDispatch } from "react-redux";
import { setMovies } from "../../redux/reducers/movies";

export const MainView = () => {
    const user = useSelector((state) => state.user);
    const movies = useSelector((state) => state.movies.list);
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedToken = localStorage.getItem("token");
    const [token, setToken] = useState(storedToken ? storedToken : null);
    const dispatch = useDispatch();

    //const [favoriteMovies, setFav] = useState("");
    // const navigate = useNavigate(); 
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
                const moviesFromApi = data.map((data) => {
                    return {
                        id: data._id,
                        title: data.title,
                        //add image link here
                        image: data.imageUrl,
                        director: data.director,
                        genre: data.genre,
                        description: data.description
                    };
                });

                dispatch(setMovies(moviesFromApi));
                localStorage.setItem("movies", JSON.stringify(movies));
                console.log("movies from api:", data);
            });
    }, [token]); //END useEffect (!token)

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
            <NavigationBar />
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

 <NavigationBar user={user}
                query={searchQuery}
                handleSearch={handleSearch}
                onLoggedOut={() => {
                    setUser(null);
                    setToken(null)
                    localStorage.clear()
                }}
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
*/