import React from "react";
import { useState, useEffect } from "react";
//import { useSelector } from "react-redux";
import { MovieCard } from "../movie-card/movie-card";
import { MoviesFilter } from "../movies-filter/movies-filter";
import { Col, Row } from "react-bootstrap";

export const MoviesList = () => {
    const [movies, setMovies] = useState([]);
    const [filter, setFilter] = useState("");
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedToken = localStorage.getItem("token");
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);


    //Redux
    // const movies = useSelector((state) => state.movies.list);
    //const filter = useSelector((state) =>
    //  state.moives.filter).trim().towLowerCase();

    useEffect(() => {
        if (!token) {
            return;
        }
        // Fetch movies data and set it to the state
        fetch("https://movie-api-nj6m.onrender.com/movies",
            { headers: { Authorization: `Bearer ${token}` } }
        )
            .then((response) => response.json())
            .then((data) => {

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
                setMovies(moviesFromApi);
                localStorage.setItem("movies", JSON.stringify(movies));
                console.log("movies from api:", data);
            });
    }, [token]);



    const filteredMovies = movies.filter(movie =>
        movie.title.toLowerCase().includes(filter.toLowerCase())
    );

    const handleFilterChange = event => {
        setFilter(event.target.value);
    };

    return (
        <>
            <Row>
                <MoviesFilter onChange={handleFilterChange} value={filter} />
            </Row>
            <Row>
                {movies.length === 0 ? (
                    <Col>The list is empty!</Col>
                ) : (
                    filteredMovies.map((movie) => (
                        <Col className="mb-4" key={movie.id} md={3}>
                            <MovieCard movie={movie} />
                        </Col>
                    ))
                )}
            </Row>
        </>
    );
};

