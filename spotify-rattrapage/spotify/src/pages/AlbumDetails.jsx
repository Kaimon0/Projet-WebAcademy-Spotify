import React from "react"
import { useState, useEffect } from "react";
import NavBar from "./Components/NavBar"
import { useParams } from "react-router-dom";

function AlbumDetails() {

    const [albumDetails, setAlbumDetails] = useState([]);
    const [albumTracks, setAlbumTracks] = useState([]);

    let param = useParams().id.slice(1);


    useEffect(() => {
        fetch(`http://localhost:8000/albums/${param}`, {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data)
                setAlbumDetails(data.album);
                setAlbumTracks(data.tracks);
            });


    }, []);


    console.log(param);
    // setAlbumId(param);


    return <>
        <NavBar />
        <div className="container-details">

            <div className="details">
                <img src={albumDetails.cover} alt="cover" />
                <div className="info">
                    <h2>{albumDetails.name}</h2>
                    <p>{albumDetails.description}</p>
                </div>

                <div className="tracks-list">
                    {albumTracks.map(track => (
                        <div className="track">
                            <p className="track-number">
                                {track.track_no}
                            </p>
                            <h3>{track.name}</h3>
                            <audio src={track.mp3} controls></audio>
                        </div>
                    ))}
                </div>

            </div>

        </div>
    </>
}

export default AlbumDetails