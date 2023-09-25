import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import "../CSS/Navbar.css";
// import { api } from "../utils/axios";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Navbar({ isFav }) {
  const [show, handleShow] = useState(false);
  const [click, setClick] = useState(false);

  const Navigate = useNavigate();

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        handleShow(true);
      } else {
        handleShow(false);
      }
    });
  });

  const handleClick = () => {
    setClick(!click);
  };
  if (click) {
    setTimeout(handleClick, 15000);
  }

  const handleLogout = () => {
    localStorage.removeItem("usertoken");
    Navigate("/login");
  };

  const handleDelete = async () => {
    const olduser = await axios.post(
      "https://netflix-clone-backend-0wrj.onrender.com/olduser",
      "",
      {
        headers: { Authorization: localStorage.getItem("usertoken") },
      }
    );

    if (olduser) {
      try {
        const respone = await axios.post(
          "https://netflix-clone-backend-0wrj.onrender.com/accountDelete",
          "",
          {
            headers: { Authorization: localStorage.getItem("usertoken") },
          }
        );
        if (respone) {
          if (respone.data.success === true) {
            toast.success("The account has been deleted successfully");
            localStorage.removeItem("usetoken");
            setTimeout(() => {
              Navigate("/");
            }, 2000);
          } else {
            toast.info(respone.data.nessage);
          }
        }
      } catch (error) {
        if (error.respone.status === 503) {
          toast.error("The server is down, Please try again later!");
        }
      }
    }
  };

  return (
    <div className={`nav ${show || !isFav ? "nav_black" : null}`}>
      <img
        className="nav_logo"
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/330px-Netflix_2015_logo.svg.png"
        alt="Netflix Logo"
        onClick={() => {
          Navigate("/netflixintro");
        }}
      />
      <div className="nav_container" onClick={handleClick}>
        <button type="button" className="nav_button">
          ☰
        </button>
      </div>

      <div className={`nav_dropdown ${click && "show"}`}>
        <ul>
          <li
            onClick={() => {
              isFav ? Navigate("/Favourites") : Navigate("/Netflix");
            }}
          >
            {isFav ? "My-Favourites" : "Home"}
          </li>
          <li onClick={handleDelete}>Delete Account</li>
          <li onClick={handleLogout}>Logout</li>
        </ul>
      </div>

      <ToastContainer position="bottom-right" theme="colored" />
    </div>
  );
}

export default Navbar;
