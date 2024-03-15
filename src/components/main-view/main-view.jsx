import { useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";


export const MainView = () => {
    const [movies, setmovies] = useState([
        {
            id: 1,
            title: "The Starling",
            image:
                "https://en.wikipedia.org/wiki/The_Starling#/media/File:The_Starling.jpg",
            director: "Theodore Melfi",
            genre: "Comedy",
            description: "After Lilly suffers a loss, a combative Starling takes nest beside her quiet home. The feisty bird taunts and attacks the grief-stricken Lilly. On her journey to expel the Starling, she rediscovers her will to live and capacity for love."
        },
        {
            id: 2,
            title: "Hidden Figures",
            image:
                "https://en.wikipedia.org/wiki/Hidden_Figures#/media/File:The_official_poster_for_the_film_Hidden_Figures,_2016.jpg",
            director: "Theodore Melfi",
            genre: "Drama",
            description: "The story of a team of female African-American mathematicians who served a vital role in NASA during the early years of the U.S. space program."
        },
        {
            id: 3,
            title: "Black Widow",
            image:
                "https://upload.wikimedia.org/wikipedia/en/e/e9/Black_Widow_%282021_film%29_poster.jpg",
            director: "Cate Shortland",
            genre: "Action",
            description: "Natasha Romanoff, also known as Black Widow, confronts the darker parts of her ledger when a dangerous conspiracy arises"
        },
        {
            id: 4,
            title: "Wonder Woman",
            image:
                "https://en.wikipedia.org/wiki/Wonder_Woman_(2017_film)#/media/File:Wonder_Woman_(2017_film)_poster.jpg",
            director: "Patty Jenkins",
            genre: "Action",
            description: "Wonder Woman', 'Diana, princess of the Amazons, discovers her full powers and true destiny while fighting alongside men in a war to end all wars."
        },
        {
            id: 5,
            title: "Girls Trip",
            image:
                "https://en.wikipedia.org/wiki/Girls_Trip#/media/File:Girls_Trip_film_poster.png",
            director: "Malcolm D. Lee",
            genre: "Comedy",
            description: "When four lifelong friends travel to New Orleans for the annual Essence Festival, sisterhoods are rekindled, wild sides are rediscovered, and there''s enough dancing, drinking, brawling and romancing to make the Big Easy blush."
        },
    ]);
    const [selectedMovie, setSelectedMovie] = useState(null);

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