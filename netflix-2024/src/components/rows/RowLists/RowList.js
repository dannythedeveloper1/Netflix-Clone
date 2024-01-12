import React, { useEffect, useRef, useState } from "react";
import "./RowList.css";
import {
  PlayArrow,
  Add,
  ThumbUpAltOutlined,
  ThumbDownOutlined,
  KeyboardArrowDown,
} from "@mui/icons-material";

import Slider from "react-slick";
import axios from "../../../utils/axios";
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";
// tmdb image path baseUrl
const base_url = "https://image.tmdb.org/t/p/original/";

const RowList = ({ title, reqUrl }) => {
  const [movies, setMovies] = useState([]);
  const [isHovered, setIsHovered] = useState(false);
  const [trailerUrl, setTrailerUrl] = useState("");
    const trailer =
      "https://player.vimeo.com/external/371433846.sd.mp4?s=236da2f3c0fd273d2c6d9a064f3ae35579b2bbdf&profile_id=139&oauth2_token_id=57447761";

  // fetch  data from tmdb
  useEffect(() => {
    try {
      async function fetchData() {
        const request = await axios.get(reqUrl);
        //   console.log(request);
        setMovies(request.data.results);
        return request;
      }
      fetchData();
    } catch (error) {
      console.log(`error found:${error}`);
    }
  }, [reqUrl]);
  // mouse hover handler
  const onMouseEnterHandler = () => {
    setIsHovered(true);
  };
  const onMouseLeaveHandler = () => {
    setIsHovered(true);
  };
  // movie trailer opt
  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };
  // get movie trailers
  const handleMouseHover = (movie) => {
    if (trailerUrl) {
      setTrailerUrl("");
    } else {
      movieTrailer(movie?.title || "")
        .then((url) => {
          const urlParams = new URLSearchParams(new URL(url).search);
          setTrailerUrl(urlParams.get("v"));
        })
        .catch((error) => console.log(error));
    }
  };

  // react-slick setting
  //   var settings = {
  //     dots: false,
  //     lazyLoad: true,
  //     infinite: false,
  //     speed: 500,
  //     slidesToShow: 6,
  //     slidesToScroll: 6,
  //     initialSlide: 0,
  //     arrows: false,
  //     responsive: [
  //       {
  //         breakpoint: 1024,
  //         settings: {
  //           slidesToShow: 3,
  //           slidesToScroll: 3,
  //           infinite: true,
  //           dots: false,
  //           arrows: false,
  //         },
  //       },
  //       {
  //         breakpoint: 600,
  //         settings: {
  //           slidesToShow: 2,
  //           slidesToScroll: 2,
  //           initialSlide: 2,
  //           dots: false,
  //           arrows: false,
  //         },
  //       },
  //       {
  //         breakpoint: 480,
  //         settings: {
  //           slidesToShow: 1,
  //           slidesToScroll: 1,
  //           dots: false,
  //           arrows: false,
  //         },
  //       },
  //     ],
  //   };
  return (
    <div className="netflix-movies-container bg-warning pt-5">
      <div className="netflix-movie-title">
        <h2>{title}</h2>
      </div>
      <div className="netflix-movie-wrapper">
        <div className="netflix-movies-lists ">
          {/* <Slider {...settings}> */}
          {movies?.map((singleMovie) => (
            <div
              className="netflix-movies-list"
              key={singleMovie.id}
              // onMouseEnter={onMouseEnterHandler}
              // onMouseLeave={onMouseLeaveHandler}
              // onMouseOver={() => handleMouseHover(singleMovie)}
            >
              <img
                src={`${base_url}${singleMovie.backdrop_path}`}
                alt={singleMovie.name}
              />
              {/* {isHovered && (
                <>
                  <video src={trailer} autoPlay={true} loop muted />
                  <div className="movie-info ">
                    <div className="movie-info-icons-wrapper d-flex justify-content-betwwen">
                      <div className="movie-info-icons">
                        <PlayArrow className="movie-info-icon" />
                        <Add className="movie-info-icon" />
                        <ThumbUpAltOutlined className="movie-info-icon" />
                        <ThumbDownOutlined className="movie-info-icon" />
                      </div>
                      <div>
                        <KeyboardArrowDown className="movie-info-icon" />
                      </div>
                    </div>
                    <div className="movie-info-txt">
                      <span>98% match</span>
                      <span className="movie-info-agelimit">+16</span>
                      <span>2H 15</span>
                    </div>
                    <div className="genre">Exiting.epic world.spaceTravel</div>
                  </div>
                </>
              )} */}
            </div>
          ))}
          {/* </Slider> */}
        </div>
      </div>
    </div>
  );
};

export default RowList;
