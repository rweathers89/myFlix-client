import React from "react";
import { useState } from "react";
//import { useSelector, useDispatch } from "react-redux";
import Form from "react-bootstrap/Form";
//import { setFilter } from "../../redux/reducers/movies";

export const MoviesFilter = () => {
    const [filter, setFilter] = useState("");

    const handleFilterChange = (e) => {
        setFilter(e.target.value);
    };

    return (
        <Form.Control
            type="text"
            placeholder="Search..."
            value={filter}
            onChange={handleFilterChange}
        />
    );
};

// redux syntax
/* 
export const MoviesFilter = () => {
    const filter = useSelector((state) => state.movies.filter);
    const dispatch = useDispatch();

    return (
        <Form.Control
            type="text"
            placeholder="Search..."
            value={filter}
            onChange={(e) => dispatch(setFilter(e.target.value))}
        />
    );
};

*/
