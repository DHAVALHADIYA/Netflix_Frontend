import React, { useEffect } from "react";
import "../CSS/Netflix.css";
import Navbar from "../Components/Navbar";
import Banner from "../Components/Banner";
import Row from "../Components/Row";
import request from "../utils/request";
import { useNavigate } from "react-router-dom";

function Netflix() {
  const Navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("usertoken")) {
      Navigate("/");
    }
  }, [Navigate]);

  return (
    <div className="flix">
      <Navbar isFav={true} />
      <Banner />
      <Row
        name="Netflix-Originals"
        title="Netflix Originals"
        fetchUrl={request.fetchNetflixOriginals}
        isLargeRow={true}
      />
      <Row
        name="Trending-Daily"
        title="Trending Daily"
        fetchUrl={request.fetchTrendingDaily}
      />
      <Row
        name="Trending-Weekly"
        title="Trending Weekly"
        fetchUrl={request.fetchTrendingWeekly}
      />
      <Row
        name="Top-Rated"
        title="Top Rated"
        fetchUrl={request.fetchTopRated}
      />
      <Row name="Popular" title="Popular" fetchUrl={request.fetchPopular} />
      <Row
        name="Horror"
        title="Horror Movies"
        fetchUrl={request.fetchHorrorMovies}
      />
      <Row
        name="Action"
        title="Action Movies"
        fetchUrl={request.fetchActionMovies}
      />
      <Row
        name="Comedy"
        title="Comedy Movies"
        fetchUrl={request.fetchComedyMovies}
      />
      <Row
        name="Romance"
        title="Romance Movies"
        fetchUrl={request.fetchRomanceMovies}
      />
      <Row
        name="Adventure"
        title="Adventure Movies"
        fetchUrl={request.fetchAdventureMovies}
      />
      <Row
        name="Animation"
        title="Animation Movies"
        fetchUrl={request.fetchAnimationMovies}
      />
      <Row
        name="Crime"
        title="Crime Movies"
        fetchUrl={request.fetchCrimeMovies}
      />

      <Row
        name="Family"
        title="Family Movies"
        fetchUrl={request.fetchFamilyMovies}
      />
      <Row
        name="Fantasy"
        title="Fantasy Movies"
        fetchUrl={request.fetchFantasyMovies}
      />

      <Row
        name="Music"
        title="Music Movies"
        fetchUrl={request.fetchMusicMovies}
      />
      <Row
        name="Mystery"
        title="Mystery Movies"
        fetchUrl={request.fetchMysteryMovies}
      />

      <Row name="TV-Movie" title="TV Movies" fetchUrl={request.fetchTVMovies} />
      <Row
        name="Thriller"
        title="Thriller Movies"
        fetchUrl={request.fetchThrillerMovies}
      />
      <Row name="War" title="War Movies" fetchUrl={request.fetchWarMovies} />
      <Row
        name="Western"
        title="Western Movies"
        fetchUrl={request.fetchWesternMovies}
      />
    </div>
  );
}

export default Netflix;
