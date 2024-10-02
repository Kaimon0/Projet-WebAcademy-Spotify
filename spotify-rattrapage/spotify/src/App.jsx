import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import HomePage from "./pages/HomePage"
import AllAlbums from "./pages/AllAlbums"
import AllArtists from "./pages/AllArtists"
import AllGenres from "./pages/AllGenres"
import AlbumDetails from "./pages/AlbumDetails";
import GenreDetails from "./pages/genreDetails"
import ArtistDetails from "./pages/ArtistDetails";
import Search from "./pages/Search";
import "./App.css"

const router = createBrowserRouter([
   {
      path: '/',
      element: <div><HomePage/></div>
   },   
   
   {
      path: '/allAlbums',
      element: <div><AllAlbums/></div>
   },

   {
      path: '/albumDetails/:id',
      element: <div><AlbumDetails/></div>
   },

   {
      path: '/allGenres',
      element: <div><AllGenres/></div>
   },

   {
      path: '/genreDetails/:id',
      element: <div><GenreDetails/></div>
   },

   {
      path: '/allArtists',
      element: <div><AllArtists/></div>
   },

   {
      path: '/artistDetails/:id',
      element: <div><ArtistDetails/></div>
   }, 

   {
      path: '/Search',
      element: <div><Search/></div>
   }


]) 

// console.log("yes")


function App() {
   return <RouterProvider router={router}/>

   // return    <div><HomePage/></div>

   
}

export default App
