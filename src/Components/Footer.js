import React from "react";
// import "../CSS/Footer.css";

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
    <footer className={isBottom ? "lfooter" : "sfooter"}>
      <div className="footerContent">
        <p className={isBottom ? "footerTop2" : "footerTop"} id="call">
          Questions? Call{" "}
          <span className="call" onClick={handleClick}>
            000-800-919-1694
          </span>
        </p>
        <ul className="footer">
          <li className="footerLinkItem">
            <div onClick={handleClick} className="footerLink">
              FAQ
            </div>
          </li>
          <li className="footerLinkItem">
            <div onClick={handleClick} className="footerLink">
              Help Centre
            </div>
          </li>
          <li className="footerLinkItem">
            <div onClick={handleClick} className="footerLink">
              Terms of Use
            </div>
          </li>
          <li className="footerLinkItem">
            <div onClick={handleClick} className="footerLink">
              Privacy
            </div>
          </li>
          <li className="footerLinkItem">
            <div onClick={handleClick} className="footerLink">
              Corporate Information
            </div>
          </li>
          <li className="footerLinkItem">
            <div onClick={handleClick} className="footerLink">
              Only on Netflix
            </div>
          </li>
          <li className="footerLinkItem">
            <div onClick={handleClick} className="footerLink">
              Account
            </div>
          </li>
          <li className="footerLinkItem">
            <div onClick={handleClick} className="footerLink">
              Contact Us
            </div>
          </li>
          {isBottom ? null : (
            <li className="footerLinkItem">
              <div onClick={handleClick} className="footerLink">
                Media Centre
              </div>
            </li>
          )}
          {isBottom ? null : (
            <li className="footerLinkItem">
              <div onClick={handleClick} className="footerLink">
                Ways to Watch
              </div>
            </li>
          )}
          {isBottom ? null : (
            <li className="footerLinkItem">
              <div onClick={handleClick} className="footerLink">
                Speed Test
              </div>
            </li>
          )}
          {isBottom ? null : (
            <li className="footerLinkItem">
              <div onClick={handleClick} className="footerLink">
                Legal Notices
              </div>
            </li>
          )}
        </ul>
      </div>

      <div className="copyright">
        <p>© {year}, Netflix.com, Inc. or its affiliates</p>
      </div>
    </footer>
  );
}

export default Footer;
