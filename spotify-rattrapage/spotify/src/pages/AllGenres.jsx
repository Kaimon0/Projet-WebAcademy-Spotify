import React from "react"
import { useState, useEffect } from "react";
import NavBar from "./Components/NavBar";
import { useNavigate } from "react-router-dom";


function AllGenres() {
    const [genres, setGenres] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8000/genres', {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
        })
            .then((res) => res.json())
            .then((data) => {

                setGenres(data);

            });
    },[]);


    console.log(genres);


    function NavigateDetails({ genreP, onClick }) {

        return <>
            <h2 className="titre-genre"  onClick={onClick}>{genreP.name}</h2>

        </>
    }

    const navigate = useNavigate();

    const handleClick = (id) => {

        navigate(`/genreDetails/:${id}`)
    }


    return <>
        <NavBar />
        <div className="container-all-genres">
            {genres.map(genre => (
                <NavigateDetails genreP={genre} onClick={() => handleClick(genre.id)} />

            ))}
        </div>

    </>
}

export default AllGenres