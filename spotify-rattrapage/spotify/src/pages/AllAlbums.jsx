import React from "react"
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "./Components/NavBar"
import TopButton from "./Components/TopButton"

function AllAlbums() {

    const [albums, setAlbums] = useState([]);

    const [page, setPage] = useState(0);


    useEffect(() => {
        fetch(`http://localhost:8000/albums?page=${page}&limit=20`, {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
        })
            .then((res) => res.json())
            .then((newAlbums) => {
                // console.log(newAlbums)

                setAlbums((prevAlbums) => {
                    const updatedAlbums = [...prevAlbums];
                    newAlbums.forEach(album => {
                        if (!updatedAlbums.find(a => a.id === album.id)) {
                            updatedAlbums.push(album);
                        }
                    });
                    return updatedAlbums;
                });
            });

    }, [page]);

    console.log(albums);



    function NavigateDetails({albumP, onClick}) {

        return <>
                <div className="album-container" onClick={onClick} >
                    <img src={albumP.cover} alt="Cover" className="album-cover" />
                    <h2 className="titre-album">{albumP.name}</h2>
                </div>
            
            <TopButton />
        </>
    }

    const navigate = useNavigate();

    const handleClick = (id) => {

        navigate(`/albumDetails/:${id}`)
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
        {albums.map(album => (
            <NavigateDetails albumP={album} onClick={()=> handleClick(album.id)}/>
        ))}
        </div>
    </>

}

export default AllAlbums