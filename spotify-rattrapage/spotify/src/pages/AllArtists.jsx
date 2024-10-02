import React from "react"
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "./Components/NavBar"
import TopButton from "./Components/TopButton"


function AllArtists() {

    const [Artists, setArtists] = useState([]);

    const [page, setPage] = useState(0);


    useEffect(() => {
        fetch(`http://localhost:8000/Artists?page=${page}&limit=20`, {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
        })
            .then((res) => res.json())
            .then((newArtists) => {
                // console.log(Artists)

                setArtists((prevArtists) => {
                    const updatedArtists = [...prevArtists];
                    newArtists.forEach(artist => {
                        if (!updatedArtists.find(a => a.id === artist.id)) {
                            updatedArtists.push(artist);
                        }
                    });
                    return updatedArtists;
                });
            });

    }, [page]);

    console.log(Artists);


    function NavigateDetails({ artistP, onClick }) {

        return <>
            <div className="artist-container" onClick={onClick} >
                <img src={artistP.photo} alt="Cover" className="artist-cover" />
                <h2 className="titre-artist">{artistP.name}</h2>
            </div>

            <TopButton />
        </>
    }

    const navigate = useNavigate();

    const handleClick = (id) => {

        navigate(`/artistDetails/:${id}`)
    }


    const handleScroll = () => {

        if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight) return;
        setPage((prevPage) => prevPage + 10);


    }

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return <>
        <NavBar />
        <div className="container">
            {Artists.map(artist => (
                <NavigateDetails artistP={artist} onClick={() => handleClick(artist.id)} />

            ))}
        </div>
        <TopButton />

    </>

}



export default AllArtists