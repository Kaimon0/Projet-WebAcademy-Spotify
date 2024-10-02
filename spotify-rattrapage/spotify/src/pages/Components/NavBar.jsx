import React from "react"
import { Link } from "react-router-dom";

function NavBar() {

    return <nav className="navbar">
        <h1>
            <Link to="/">Spotify</Link>
        </h1>

        <ul className="linkhome">

            <li>
                <Link to="/allAlbums">Albums</Link>
            </li>

            <li>
                <Link to="/allArtists">Artistes</Link>
            </li>

            <li>
                <Link to="/allGenres">Genres</Link>
            </li>

            <li>
                <Link to="/Search">Rechercher</Link>
            </li>
        </ul>
    </nav >


}

export default NavBar