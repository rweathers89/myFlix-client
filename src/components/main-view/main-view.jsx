import { useEffect, useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";


export const MainView = () => {
    const [movies, setmovies] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);
    useEffect(() => {
        fetch("movie-api-nj6m.onrender.com/")
            .then((response) => response.json())
            .then((data) => {
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
    }, []);

    if (selectedMovie) {
        return <MovieView movie={selectedMovie} onBackClick={() => setSelectedBook(null)} />;
    }

    if (movies.length === 0) {
        return <div>The list is empty!</div>
    }

    return (
        <div>
            {movies.map((movie) => {
                <MovieCard
                    key={movie.id}
                    movie={movie}
                    onMovieClick={(newSelectedMovie) => {
                        setSelectedMovie(newSelectedMovie);
                    }}
                />
            })}
        </div>
    );
};    