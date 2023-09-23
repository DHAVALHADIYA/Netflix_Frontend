import React, { useEffect, useState } from "react";
import { instance } from "../utils/axios";
import "../CSS/Row.css";
import YouTube from "react-youtube";
import axios from "axios";

// import { api } from "../utils/axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const baseurl = "https://image.tmdb.org/t/p/original/";
let clickIndex;
// here props object is destructured into title
function Row({ title, fetchUrl, isLargeRow }) {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");
  const [hover, sethover] = useState(false);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  // A snippet of code which runs based on a specific conditions
  useEffect(() => {
    async function fetchData() {
      setLoading(true); // Start loading
      try {
        // if [], run once when the row loads and dont run again. if we pass the movies inside the [] then it will run all time when movies changes. Here we only want change when row loads up.
        // Also we have to make the function call asynchronous because we are making a request to third party web i.e. TMDB so sometime the response can be two three second late.
        const request = await instance.get(`${fetchUrl}&page=${page}`);
        setMovies((prevMovies) => [...prevMovies, ...request.data.results]);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
      setLoading(false); // Finish loading
    }
    fetchData();
  }, [fetchUrl, page]);

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1); // Load more movies when user scrolls
  };

  // This is for Youtube video.
  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };
  const handleClick = (movie) => {
    if (trailerUrl) {
      setTrailerUrl("");
    } else {
      const query = movie?.name || movie?.title || movie?.original_title;
      const key = "AIzaSyCI_ZeQHva1fiUyzl7DAfZ_IFjryk7Dspc";
      const url =
        "https://youtube.googleapis.com/youtube/v3/search?type=video&q=" +
        query +
        " trailer&key=" +
        key;
      const movieTrailer = async () => {
        let request = await axios.get(url).then((response) => {
          const v = response.data.items[1].id.videoId;
          setTrailerUrl(v);
        });
        return request;
      };
      movieTrailer();
    }
  };

  // This is for dropdown
  const handleButton = (index) => {
    clickIndex = index;
    sethover(!hover);
  };
  if (hover) {
    setTimeout(() => {
      sethover(false);
    }, 15000);
  }

  const handleList = async (movie) => {
    if (movie) {
      try {
        const response = await axios.post(
          "https://netflix-clone-backend-0wrj.onrender.com/addfav",
          movie,
          {
            headers: { Authorization: localStorage.getItem("usertoken") },
          }
        );

        if (response) {
          let status = response.status;
          if (status === 200) {
            toast.success(
              "The movie has been added to your-favourites successfully"
            );
          } else if (status === 201) {
            toast.warn("The movie already exist in Favourites...");
          }
        }
      } catch (err) {
        let status = err.response.status;
        if (status === 403) {
          toast.error(err.response.data.message);
        } else {
          toast.error("The server is down, Please try again later");
        }
      }
    }
  };

  return (
    <div className="row">
      <h2>{title}</h2>
      <div className="rowPosters">
        {movies.map((movie, index) => {
          return (
            <>
              <img
                onClick={() => handleClick(movie)}
                key={index}
                className={`${isLargeRow ? "rowPosterLarge" : "rowPoster"}`}
                src={`${baseurl}${
                  isLargeRow
                    ? movie.poster_path
                    : movie.backdrop_path || movie.poster_path
                }`}
                alt={movie?.name}
              />
              <div
                className="fav_button"
                onClick={() => handleButton(index)}
                key={index + 1}
              >
                <button className="fav" key={movie.id}>
                  ⋮
                </button>
                {hover && index === clickIndex ? (
                  <div
                    className="fav_dropdown"
                    key={index}
                    onClick={() => handleList(movie)}
                  >
                    <ul key={index}>
                      <li key={index}>Add to favourites</li>
                    </ul>
                  </div>
                ) : null}
              </div>
            </>
          );
        })}
      </div>
      {loading && <p>Movie Fetching...</p>}
      {!loading && <button onClick={handleLoadMore}></button>}
      {trailerUrl ? <YouTube videoId={trailerUrl} opts={opts} /> : null}
      <ToastContainer position="bottom-right" theme="colored" />
    </div>
  );
}

export default Row;
