import React, { useEffect, useState } from "react";
import "../CSS/Favourite.css";
import Navbar from "../Components/Navbar";
import axios from "axios";
// import { api } from "../utils/axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import YouTube from "react-youtube";

let fclickIndex;
const fimageUrl = "https://image.tmdb.org/t/p/original/";
function Favourites() {
  const Navigate = useNavigate();

  const [favMovie, setFavMovie] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");
  const [hover, sethover] = useState(false);
  const [deleteMovie, setDeleteMovie] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem("usertoken")) {
      Navigate("/Login");
    }

    if (localStorage.getItem("usertoken")) {
      const fetchMovie = async () => {
        const response = await axios.get(
          "https://netflix-clone-z1iq.onrender.com/getfav",
          {
            headers: { Authorization: localStorage.getItem("usertoken") },
          }
        );

        console.log(response);
        if (response.data === undefined || response.data.result.length === 0) {
          setFavMovie([]);
        } else {
          setFavMovie(response.data.result[0].movie);
        }

        deleteMovie && setDeleteMovie(false);
        return response;
      };
      fetchMovie();
    }
  }, [deleteMovie]);

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

  const handleButton = (index) => {
    fclickIndex = index;
    sethover(!hover);
  };

  if (hover) {
    setTimeout(() => {
      sethover(false);
    }, 15000);
  }

  const handleList = async (movie) => {
    try {
      const response = await axios.post(
        "https://netflix-clone-z1iq.onrender.com/favdlt",
        movie,
        {
          headers: { Authorization: localStorage.getItem("usertoken") },
        }
      );
      if (response) {
        let status = response.status;
        if (status === 200) {
          console.log("sachu");
          toast.success(
            "The movie has been deleted successfully from your favourites"
          );
          setDeleteMovie((prevDeleteMovie) => !prevDeleteMovie);
        }
      }
    } catch (error) {
      let status = error.response.status;
      if (status === 500) {
        toast.error("Error in deleting movie from favourites");
      }
    }
  };

  return (
    <div>
      <Navbar isFav={false} />
      <div className="favHeading">
        {favMovie === undefined || favMovie.length === 0 ? (
          <h1>Favourite List is Empty</h1>
        ) : (
          <h1>Favourite List</h1>
        )}
      </div>
      <div className="frow">
        <div className="frowPosters">
          {favMovie === undefined
            ? null
            : favMovie.map((movie, index) => {
                return (
                  <>
                    <img
                      onClick={() => handleClick(movie)}
                      key={index}
                      className="frowPoster"
                      src={`${fimageUrl}${
                        movie.backdrop_path || movie.poster_path
                      }`}
                      alt={movie?.name}
                    />
                    <div
                      className="f_fav_button"
                      onClick={() => handleButton(index)}
                      key={index + 1}
                    >
                      <button className="f_fav" key={movie.id}>
                        ⋮
                      </button>
                      {hover && index === fclickIndex ? (
                        <div
                          className="f_fav_dropdown"
                          key={index}
                          onClick={() => handleList(movie)}
                        >
                          <ul key={index}>
                            <li key={index}>Delete &#10060;</li>
                          </ul>
                        </div>
                      ) : null}
                    </div>
                  </>
                );
              })}
        </div>
        {trailerUrl ? <YouTube videoId={trailerUrl} opts={opts} /> : null}
      </div>
      <ToastContainer position="bottom-right" theme="colored" />
    </div>
  );
}

export default Favourites;
