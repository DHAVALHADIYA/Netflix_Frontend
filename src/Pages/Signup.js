import React, { useState, useEffect } from "react";
import "../CSS/Signup.css";
import Footer from "../Components/Footer";
// now a day usenavigate is replace with usehistory
// usenavigate is only hook which comes from react router dom rather than react
import { useNavigate } from "react-router-dom";
// used for http req
import { api } from "../utils/axios";
import axios from "axios";
// used for validation data of user
import { userSchema } from "../Validation/userValidation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import logo from "../Images/netflix_logo.png";
import tv from "../Images/tv.png";
import tv_video from "../Images/tv_video.m4v";
import part2 from "../Images/part2.jpg";
import part3 from "../Images/part3.png";
import saif from "../Images/saif.m4v";
import part4 from "../Images/part4.png";

function Signup() {
  const Navigate = useNavigate();

  // this is for password
  const [showPassword, setShowPassword] = useState(false);

  // this is for show frqntally asked quation answer show
  const [isClicked1, setIsClicked1] = useState(false);
  const [isClicked2, setIsClicked2] = useState(false);
  const [isClicked3, setIsClicked3] = useState(false);
  const [isClicked4, setIsClicked4] = useState(false);

  // this is for register
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValue) => {
      return {
        ...prevValue,
        [name]: value,
      };
    });
  };

  const handleLogin = () => {
    Navigate("/Login");
  };

  // this is used for access the window size dynamically
  const [windowSize, setWindowSize] = useState(getWindowSize());
  useEffect(() => {
    if (localStorage.getItem("usertoken")) {
      localStorage.removeItem("usertoken");
    }

    function handleWindowResize() {
      setWindowSize(getWindowSize());
    }

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  function getWindowSize() {
    const { innerWidth, innerHeight } = window;
    return { innerWidth, innerHeight };
  }

  let customStyle;
  if (windowSize.innerWidth >= 950) {
    customStyle = {
      display: "grid",
      width: "50%",
      gridTemplateColumns: showPassword ? "1fr 1fr" : "2fr 1fr",
    };
  } else if (windowSize.innerWidth < 950) {
    customStyle = {
      display: "grid",
      width: "50%",
      gridTemplateRows: "1fr 1fr",
    };
  }

  let inputStyle;
  if (windowSize.innerWidth < 950) {
    inputStyle = {
      height: showPassword ? "100%" : "200%",
    };
  }

  const handleSignIn = async (e) => {
    e.preventDefault();
    let validation = await userSchema
      .validate(formValues, { abortEarly: false })
      .catch((response) => {
        return response;
      });

    if (validation.inner !== undefined) {
      validation.inner.map((err) => {
        if (err.path === "email") {
          toast.warn(err.message);
        } else {
          toast.warn(err.message);
        }
        return null;
      });
    } else {
      try {
        const response = await api.post("/userregister", formValues);
        if (response) {
          console.log(response);
          let status = response.status;
          if (status === 201) {
            toast.success(response.data.message);
            console.log(response.data.message);
            localStorage.setItem("usertoken", response.data.token);
            setTimeout(() => {
              Navigate("/NetflixIntro");
            }, 2000);
          }
        }
      } catch (err) {
        if (err.response) {
          let status = err.response.status;
          if (status === 409) {
            toast.warn("User Already exist..");
          } else if (status === 503) {
            toast.error("The server is down. Please Try again later!..");
          } else {
            toast.error("Error in registering the data..");
          }
        }
      }
    }
  };

  return (
    <>
      <div className="register_page">
        <div className="top_part">
          <div className="container">
            <img src={logo} alt="Netflix Logo" />
          </div>
          <button
            className="login_btn"
            onClick={handleLogin}
            style={{ width: "8rem", borderRadius: "1rem" }}
          >
            Login
          </button>
        </div>

        <div className="main_con">
          <h1>Unlimited movies, TV shows and more.</h1>
          <h2>Watch Movies Trailer Now.</h2>
          <p>Ready to watch? Enter your email to create your account.</p>
          <div className="uform" style={customStyle}>
            <input
              type="email"
              placeholder="Email-Addres"
              name="email"
              value={formValues.email}
              onChange={handleChange}
              autoComplete="off"
              style={inputStyle}
            />
            {showPassword ? (
              <input
                type="password"
                placeholder="Password"
                name="password"
                value={formValues.password}
                onChange={handleChange}
              />
            ) : null}
            {!showPassword ? (
              <button
                onClick={() => setShowPassword(true)}
                className="getStartedButton"
              >
                Get Started &gt;
              </button>
            ) : null}
          </div>
          {showPassword ? (
            <button className="signupbtn" onClick={handleSignIn}>
              Sign-Up
            </button>
          ) : null}
        </div>
      </div>

      <div className="part1">
        <div className="talk">
          <h1>Enjoy on your TV.</h1>
          <p>
            Watch on smart TVs, PlayStation, Xbox, Chromecast, Apple TV, Blu-ray
            players and more.
          </p>
        </div>
        <div className="boxImg">
          <img src={tv} alt="Gif1" />
          <div className="videoClass">
            <video className="netflixVideo" autoPlay playsInline muted loop>
              <source src={tv_video} type="video/mp4" />
            </video>
          </div>
        </div>
      </div>

      <div className="part2">
        <div className="boxImg">
          <img src={part2} alt="Gif1" />
        </div>
        <div className="talk">
          <h1>Download your shows to watch offline.</h1>
          <p>Save your favourites easily and always have something to watch.</p>
        </div>
      </div>

      <div className="part1">
        <div className="talk">
          <h1>Watch everywhere.</h1>
          <p>
            Stream unlimited movies and TV shows on your phone, tablet, laptop,
            and TV.
          </p>
        </div>
        <div className="boxImg">
          <img src={part3} alt="Gif1" />
          <div className="videoClass2">
            <video className="netflixVideo" autoPlay playsInline muted loop>
              <source src={saif} type="video/mp4" />
            </video>
          </div>
        </div>
      </div>

      <div className="part2">
        <div className="boxImg">
          <img src={part4} alt="Gif1" />
        </div>
        <div className="talk">
          <h1>Create profiles for children.</h1>
          <p>
            Send children on adventures with their favourite characters in a
            space made just for them free with your membership.
          </p>
        </div>
      </div>

      <div className="containerFaqs">
        <div className="faqs">
          <h1>Frequently Asked Questions</h1>
          <div className="faqList">
            <div className="list">
              <div
                className="title"
                onClick={() => {
                  setIsClicked1(!isClicked1);
                }}
              >
                <span>What is Netflix?</span>
                <button className="icon">
                  {isClicked1 ? <span>&times;</span> : <span>+</span>}
                </button>
              </div>
              {isClicked1 ? (
                <p className="faqAnswer">
                  Netflix is a streaming service that offers a wide variety of
                  award-winning TV shows, movies, anime, documentaries and
                  more-on thousands of internet-connected devices.
                  <br />
                  <br />
                  You can watch as much as you want, whenever you want, without
                  a single ad-all for one low monthly price. There's always
                  something new to discover, and new TV shows and movies are
                  added every week!
                </p>
              ) : null}
            </div>

            <div className="list">
              <div
                className="title"
                onClick={() => {
                  setIsClicked2(!isClicked2);
                }}
              >
                <span>Where can I watch?</span>
                <button className="icon">
                  {isClicked2 ? <span>&times;</span> : <span>+</span>}
                </button>
              </div>
              {isClicked2 ? (
                <p className="faqAnswer">
                  Watch anywhere, anytime. Sign in with your Netflix account to
                  watch instantly on the web at netflix.com from your personal
                  computer or on any internet-connected device that offers the
                  Netflix app, including smart TVs, smartphones, tablets,
                  streaming media players and game consoles.
                  <br />
                  <br />
                  You can also download your favourite shows with the iOS,
                  Android, or Windows 10 app. Use downloads to watch while
                  you're on the go and without an internet connection. Take
                  Netflix with you anywhere.
                </p>
              ) : null}
            </div>

            <div className="list">
              <div
                className="title"
                onClick={() => {
                  setIsClicked3(!isClicked3);
                }}
              >
                <span>What can I watch on Netflix?</span>
                <button className="icon">
                  {isClicked3 ? <span>&times;</span> : <span>+</span>}
                </button>
              </div>
              {isClicked3 ? (
                <p className="faqAnswer">
                  Netflix has an extensive library of feature films,
                  documentaries, TV shows, anime, award-winning Netflix
                  originals, and more. Watch as much as you want, anytime you
                  want.
                </p>
              ) : null}
            </div>

            <div className="list">
              <div
                className="title"
                onClick={() => {
                  setIsClicked4(!isClicked4);
                }}
              >
                <span>Is Netflix good for kids?</span>
                <button className="icon">
                  {isClicked4 ? <span>&times;</span> : <span>+</span>}
                </button>
              </div>
              {isClicked4 ? (
                <p className="faqAnswer">
                  The Netflix Kids experience is included in your membership to
                  give parents control while kids enjoy family-friendly TV shows
                  and films in their own space.
                  <br />
                  <br />
                  Kids profiles come with PIN-protected parental controls that
                  let you restrict the maturity rating of content kids can watch
                  and block specific titles you don't want kids to see.
                </p>
              ) : null}
            </div>
          </div>
        </div>

        <div className="main_part">
          <p>
            Ready to watch? Enter your email to create or restart your
            membership.
          </p>
          <div className="uform" style={customStyle}>
            <input
              type="email"
              placeholder="Email-Addres"
              name="email"
              value={formValues.email}
              onChange={handleChange}
              style={inputStyle}
            />
            {showPassword ? (
              <input
                type="password"
                placeholder="Password"
                name="password"
                value={formValues.password}
                onChange={handleChange}
              />
            ) : null}
            {!showPassword ? (
              <button
                onClick={() => setShowPassword(true)}
                className="getStartedButton"
              >
                Get Started &gt;
              </button>
            ) : null}
          </div>
          {showPassword ? (
            <button className="signupbtn2" onClick={handleSignIn}>
              Sign-Up
            </button>
          ) : null}
        </div>
      </div>

      <Footer isBottom={false} />

      <ToastContainer position="bottom-right" theme="colored" />
    </>
  );
}

export default Signup;
