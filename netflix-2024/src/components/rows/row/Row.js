import movieTrailer from 'movie-trailer';
import "./row.css"
import axios from '../../../utils/axios';
import Slider from "react-slick";
import React, { useEffect, useRef, useState } from 'react'
import YouTube from 'react-youtube';
// right arrow icon from mui
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
// left arrow icon from mui
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";


const Row = ({ title, fetchUrl, isLargeRow }) => {
  const [movies, setMovie] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");
  const [isMoved, setIsMoved] = useState(false);
  // userref to select element
  const arrowRef = useRef(null);
  console.log(arrowRef);

  const base_url = "https://image.tmdb.org/t/p/original";

  useEffect(() => {
    (async () => {
      try {
        console.log(fetchUrl);
        const request = await axios.get(fetchUrl);
        console.log(request);
        setMovie(request.data.results);
      } catch (error) {
        console.log("error", error);
      }
    })();
  }, [fetchUrl]);

  const handleClick = (movie) => {
    if (trailerUrl) {
      setTrailerUrl("");
    } else {
      movieTrailer(
        movie?.title || movie?.name || movie?.original_name || ""
      ).then((url) => {
        console.log(url);
        const urlParams = new URLSearchParams(new URL(url).search);
        console.log(urlParams);
        console.log(urlParams.get("v"));
        setTrailerUrl(urlParams.get("v"));
      });
    }
  };

  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };

  // handler function to add next and previous btn functionality
  const prevBtnHandler = () => {
    const currentSlideIndex = arrowRef.current.innerSlider.state.currentSlide;
    if (currentSlideIndex === 0) {
      // If the current slide is the first one, set isMoved to false
      setIsMoved(false);
    }
    arrowRef.current.slickPrev();
  };

  const nextBtnHandler = () => {
    setIsMoved(true);
    arrowRef.current.slickNext();
  };

  // react-slick setting
  var settings = {
    dots: false,
    lazyLoad: true,
    infinite: false,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 6,
    initialSlide: 0,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
          infinite: false,
          dots: false,
          arrows: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
          infinite: false,
          dots: false,
          arrows: false,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: false,
          dots: false,
          arrows: false,
        },
      },
    ],
  };

  return (
    <div className="row">
      <h1>{title}</h1>
      <div className="row__posters">
        <Slider ref={arrowRef}  {...settings}>
          {movies?.map((movie, index) => (
            <img
              onClick={() => handleClick(movie)}
              key={index}
              src={`${base_url}${
                isLargeRow ? movie.poster_path : movie.backdrop_path
              }`}
              alt={movie.name}
              className={`row__poster ${isLargeRow && "row__posterLarge"}`}
            />
          ))}
        </Slider>
        <div className="slider-arrow-container">
          <button
            onClick={prevBtnHandler}
            className="btn-prev"
            style={{ display: !isMoved && "none" }}
          >
            <KeyboardArrowLeftIcon />
          </button>
          <button onClick={nextBtnHandler} className="btn-nxt">
            <KeyboardArrowRightIcon />
          </button>
        </div>
      </div>
      <div style={{ padding: "40px" }}>
        {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
      </div>
    </div>
  );
}

export default Row