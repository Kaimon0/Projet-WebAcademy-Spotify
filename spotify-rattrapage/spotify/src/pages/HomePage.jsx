import React from "react"
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "./Components/NavBar"
import TopButton from "./Components/TopButton"

function HomePage() {

  const [albums, setAlbums] = useState([]);
  // const [random, setRandom] = useState(1)


  // useEffect(() => {

  //   const randomNumberInRange = (min, max) => {
  //     return Math.floor(Math.random()
  //       * (max - min + 1)) + min;
  //   };

  //   setRandom(randomNumberInRange(1, 1625));


  //   // setRandom(randomNumberInRange(1, 1625)
  // }, []);
  // console.log(random);

  const randomNumberInRange = (min, max) => {
    return Math.floor(Math.random()
      * (max - min + 1)) + min;
  };


  useEffect(() => {
    // console.log(randomNumberInRange(1,1625))


    fetch(`http://localhost:8000/albums?page=${randomNumberInRange(1, 50)}&limit=12`, {
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



  }, []);

  function NavigateDetails({ albumP, onClick }) {

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


  return <>
    <NavBar />
    <div className="container">

      {albums.map(album => (
      <NavigateDetails albumP={album} onClick={() => handleClick(album.id)} />

      ))}

    </div>
  </>


}

export default HomePage