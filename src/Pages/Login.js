import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../CSS/Login.css";
import Footer from "../Components/Footer";
import api from "../utils/axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login() {
  const Navigate = useNavigate();

  const [lformValues, setLFormValues] = useState({
    email: "",
    password: "",
  });

  const handleChange = async (e) => {
    const { name, value } = e.target;
    setLFormValues((prevValue) => {
      return {
        ...prevValue,
        [name]: value,
      };
    });
  };

  const handleLogIn = async (e) => {
    e.preventDefault();
    if (lformValues.email !== "" && lformValues.password !== "") {
      try {
        const response = await api.post("/userlogin", lformValues);
        if (response) {
          let status = response.status;
          if (status === 200) {
            toast.success("Successfully Login..");
            localStorage.setItem("usertoken", response.data.token);
            setTimeout(() => {
              Navigate("/NetflixIntro");
            }, 2000);
          } else {
            console.log("null");
          }
        } else {
          console.log("sss");
        }
      } catch (err) {
        let status = err.response.status;
        // message = err.response.data.message;
        if (status === 503) {
          toast.error("The server is down, Please try again later");
        } else if (status === 404) {
          toast.error("No E-Mail registered with your entered E-Mail");
        } else {
          toast.error(err.response.data.message);
        }
      }
    } else {
      if (lformValues.email === "") {
        toast.warn("Please Enter your E-Mail");
      }
      if (lformValues.password === "") {
        toast.warn("Please Enter your Password");
      }
    }
  };

  return (
    <div className="logincontainer">
      <div className="login">
        <div className="ltop">
          <div className="limageContainer">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/330px-Netflix_2015_logo.svg.png"
              alt="Netflix Logo"
            />
          </div>
        </div>

        <div className="lmainContainer">
          <div className="lform">
            <h1 style={{ textAlign: "center", width: "100%" }}>Login</h1>
            <input
              type="email"
              placeholder="Enter Your Email"
              name="email"
              value={lformValues.email}
              onChange={handleChange}
              autoComplete="off"
            />
            <input
              type="password"
              placeholder="Enter Your Password"
              name="password"
              value={lformValues.password}
              onChange={handleChange}
            />
            <button onClick={handleLogIn} className="loginButton">
              Login
            </button>

            <div className="remember">
              <input type="checkbox" className="checkbox" defaultChecked />
              <p>Remember me</p>
            </div>

            <span>
              New to Netflix? <b onClick={() => Navigate("/")}>Sign up now.</b>
            </span>
          </div>
        </div>
        <Footer isBottom={true} />
      </div>
      <ToastContainer position="bottom-right" theme="colored" />
    </div>
  );
}

export default Login;
