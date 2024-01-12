import React, { useEffect, useRef, useState } from "react";
import "./RowCard.css";
import Slider from "react-slick";
import axios from "../../../utils/axios";
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
// right arrow icon from mui
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
// left arrow icon from mui
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
// tmdb image path baseUrl
const base_url = "https://image.tmdb.org/t/p/original/";
const RowCard = ({ title, reqUrl }) => {
  const [movies, setMovies] = useState([]);
  const [isMoved, setIsMoved] = useState(false);
  const [trailerUrl, setTrailerUrl] = useState("");
  const [hoveredCardId, setHoveredCardId] = useState(null);
  // userref to select element
  const arrowRef = useRef(null);
  console.log(arrowRef)
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
  console.log(movies.at(0));

  // handler function to add next and previous btn functionality
  const prevBtnHandler = () => {
    const currentSlideIndex = arrowRef.current.innerSlider.state.currentSlide;
    if (currentSlideIndex === 0) {
      // If the current slide is the first one, set isMoved to false
      setIsMoved(false);
    }
    arrowRef.current.slickPrev();
    setHoveredCardId(false);
  };
  // const prevBtnHandler = () => {
  //   if (movies.length<6) {
  //     setIsMoved(false);
  //   }
  //   arrowRef.current.slickPrev();
  //   setHoveredCardId(false);
  // };
  const nextBtnHandler = () => {
    setIsMoved(true);
    arrowRef.current.slickNext();
    setHoveredCardId(false);
  };
  // hndle hover effect
  const handleCardHover = (id) => {
    setHoveredCardId(id);
  };

  // console.log(movies);
  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };
  // get movie trailers
  const handleClick = (movie) => {
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
          slidesToShow: 3,
          slidesToScroll: 3,
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
          dots: false,
          arrows: false,
        },
      },
    ],
  };
  return (
    <div className="row-container">
      <h2>{title}</h2>
      <div className="row-poster">
        <Slider ref={arrowRef} {...settings}>
          {movies?.map((singleMovie) => (
            <Card
              key={singleMovie.id}
              onMouseEnter={() => handleCardHover(singleMovie.id)}
              onMouseLeave={() => handleCardHover(null)}
              onClick={() => handleClick(singleMovie)}
            >
              <Card.Img
                variant="top"
                src={`${base_url}${singleMovie.backdrop_path}`}
                alt={singleMovie.name}
              />

              {/* <Card.Body>
                <Card.Title>Card Title</Card.Title>
                <Card.Text>
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </Card.Text>
                <Button variant="primary">Go somewhere</Button>
              </Card.Body> */}
              {/* {hoveredCardId === singleMovie.id && (
                <Card.Body>
                  <Card.Title>abebe</Card.Title>

                  <Card.Text>text here</Card.Text>
                </Card.Body>
              )} */}
            </Card>
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
      {/* <div style={{ padding: "40px" }}>
        {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
      </div> */}
    </div>
  );
};

export default RowCard;
