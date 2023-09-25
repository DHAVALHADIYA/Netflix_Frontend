import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Netflix_Video from "../Images/NetflixIntro.mp4";
// import "../CSS/NetflixIntro.css";

function NetflixIntro() {
  const Navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("usertoken")) {
      Navigate("/");
    }
  }, [Navigate]);

  return (
    <div id="netflixIntro">
      <video playsInline autoPlay loop disablePictureInPicture id="video">
        <source src={Netflix_Video} />
      </video>
      {setTimeout(() => {
        Navigate("/Netflix");
      }, 5000)}
    </div>
  );
}

export default NetflixIntro;
