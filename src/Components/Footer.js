import React from "react";
import "../CSS/Footer.css";

function Footer({ isBottom }) {
  const handleClick = () => {
    window.scroll({
      top: 0,
      behavior: "smooth",
    });
  };

  // this is for getting current year in copyright
  const date = new Date();
  const year = date.getFullYear();

  return (
    <footer className={isBottom ? "nn_footer" : "n_footer"}>
      <div className="f_content">
        <p className={isBottom ? "f_top2" : "f_top"} id="calling">
          Questions? call{" "}
          <span className="calling" onClick={handleClick}>
            000-800-919-1694
          </span>
        </p>
        <ul className="f_foot">
          <li className="footitem">
            <div onClick={handleClick} className="footlink">
              FAQ
            </div>
          </li>
          <li className="footitem">
            <div onClick={handleClick} className="footlink">
              Help Centre
            </div>
          </li>
          <li className="footitem">
            <div onClick={handleClick} className="footlink">
              Terms of Use
            </div>
          </li>
          <li className="footitem">
            <div onClick={handleClick} className="footlink">
              Privacy
            </div>
          </li>
          <li className="footitem">
            <div onClick={handleClick} className="footlink">
              Corporate Information
            </div>
          </li>
          <li className="footitem">
            <div onClick={handleClick} className="footlink">
              Only on Netflix
            </div>
          </li>
          <li className="footitem">
            <div onClick={handleClick} className="footlink">
              Account
            </div>
          </li>
          <li className="footitem">
            <div onClick={handleClick} className="footlink">
              Contact Us
            </div>
          </li>
          {isBottom ? null : (
            <li className="footitem">
              <div onClick={handleClick} className="footlink">
                Media Centre
              </div>
            </li>
          )}
          {isBottom ? null : (
            <li className="footitem">
              <div onClick={handleClick} className="footlink">
                Ways to Watch
              </div>
            </li>
          )}
          {isBottom ? null : (
            <li className="footitem">
              <div onClick={handleClick} className="footlink">
                Speed Test
              </div>
            </li>
          )}
          {isBottom ? null : (
            <li className="footitem">
              <div onClick={handleClick} className="footlink">
                Legal Notices
              </div>
            </li>
          )}
        </ul>
      </div>

      <div className="copy">
        <p>© {year}, Netflix.com, Inc. or its affiliates</p>
      </div>
    </footer>
  );
}

export default Footer;
