import React, { useEffect, useState } from 'react';
import movieTrailer from "movie-trailer";
import ReactPlayer from "react-player/youtube";
import "./banner.css";
import axios from "axios";
const Banner = () => {
  const [movie, setMovie] = useState({});
  const [movieTitle, setMovieTitle] = useState("");
  const [trailerUrl, setTrailerUrl] = useState("");


  useEffect(() => {
    (async () => {
      try {
        const request = await axios.get(`https://api.themoviedb.org/3/tv/popular?api_key=e1be22fc273a3079dd38ee671558f1ef&language=en-US&page=1`)
        setMovie(request.data.results[
          Math.floor(Math.random() * request.data.results.length)
        ]);  
        
        setMovieTitle(movie?.title || movie?.name || movie?.original_name)
      } catch (error) {
        console.log("error", error);
      }
    })()
  }, []);

  useEffect(() => {
    setTimeout(function () {
      if (movie) {
      movieTrailer(movieTitle)
        .then((url) => {
          console.log(url)
          setTrailerUrl(url);
          // const urlParams = new URLSearchParams(new URL(url).search)
          // console.log(urlParams)
          // console.log(urlParams.get('v'))
          // setTrailerUrl(urlParams.get('v'));
        })
    }
    }, 5000);
    
  }, [movie]);



  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + '...' : str;
  }
  return (
      <div
        className="banner"
        style={{
          backgroundSize: "cover",
          backgroundImage: `url('https://image.tmdb.org/t/p/original${movie?.backdrop_path}')`,
          backgroundPosition: "center",
        }}
      >
        <div className="banner__contents">
          <h1 className="banner__title">
            {movie?.title || movie?.name || movie?.original_name}
          </h1>
          <div className="banner__buttons">
            <button className="banner__button">Play</button>
            <button className="banner__button">My List</button>
          </div>
          <h1 className="banner__description">{truncate(movie?.overview, 150)}</h1>
        </div>
        <div className="banner__fadeBottom" />
      </div>
  )
}

export default Banner