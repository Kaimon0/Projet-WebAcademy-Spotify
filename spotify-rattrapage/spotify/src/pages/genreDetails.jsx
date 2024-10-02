import React from "react"
import NavBar from "./Components/NavBar"
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import TopButton from "./Components/TopButton"


function GenreDetails() {

  let param = useParams().id.slice(1);

  const [genreName, setGenreName] = useState([]);
  const [genreAlbumsId, setGenreAlbumId] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [page, setPage] = useState(0);



  useEffect(() => {
    fetch(`http://localhost:8000/genres/${param}`, {
      method: "GET",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        setGenreName(data.genre);
        setGenreAlbumId(data.albums);
      });

  }, []);


  //  genreAlbumsId.forEach(id =>{

  //   setAlbumId(id)

  //  });

  useEffect(() => {


    fetch(`http://localhost:8000/Albums?page=${page}&limit=20`, {
      method: "GET",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data)


        setAlbums((prevAlbums) => {
          const updatedAlbums = [...prevAlbums];
          data.forEach(album => {
            if (!updatedAlbums.find(a => a.id === album.id)) {

              updatedAlbums.push(album);
            }
          });
          return updatedAlbums;
        });
      });

  }, [page]);


  // const genreAlb = [];

  //   genreAlbumsId.forEach(id => {

  //    if (albums.find(a => a.id === id)) {
  //       genreAlb.push(albums);
  //     };

  //   })

    // console.log(genreAlb)



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

    <h2>{genreName.name}</h2>

    <div className="container">


      {albums.map(album => (
        <NavigateDetails albumP={album} onClick={() => handleClick(album.id)} />
      ))}

      <TopButton />

    </div >


  </>
}

export default GenreDetails