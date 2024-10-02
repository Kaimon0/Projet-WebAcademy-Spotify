import React from "react"
import { useState, useEffect } from "react";
import NavBar from "./Components/NavBar"
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";


function ArtistDetails() {

  let param = useParams().id.slice(1);

  const [artistDetails, setArtistDetails] = useState([]);
  const [artistAlbums, setArtistAlbums] = useState([]);


  useEffect(() => {
    fetch(`http://localhost:8000/artists/${param}`, {
      method: "GET",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        setArtistDetails(data);
      });


  }, []);

  useEffect(() => {
    fetch(`http://localhost:8000/albums/artist/${param}`, {
      method: "GET",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        setArtistAlbums(data);
      });


  }, []);



  function NavigateDetails({ albumP, onClick }) {

    return <>
      <div className="album-container" onClick={onClick} >
        <img src={albumP.cover} alt="Cover" className="album-cover" />
        <h2 className="titre-album">{albumP.name}</h2>
      </div>
    </>
  }

  const navigate = useNavigate();

  const handleClick = (id) => {

    navigate(`/albumDetails/:${id}`)
  }

  return <>
    <NavBar />
    <div className="container-details">

      <div className="details">
        <img src={artistDetails.photo} alt="photo" />
        <h2>{artistDetails.name}</h2>
        <div className="info">
          <h3>{artistDetails.description}</h3>
          <p>{artistDetails.bio}</p>
        </div>


        <div className="artist-albums"></div>
        {artistAlbums.map(album => (
          <NavigateDetails albumP={album} onClick={() => handleClick(album.id)} />
        ))}

      </div>
    </div>
  </>
}

export default ArtistDetails