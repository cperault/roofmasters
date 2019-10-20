/******************************************************************************************************************\
 *File:    Footer.js                                                                                               *
 *Author:  Christopher Perault                                                                                     *
 *Project: Roofmasters CMS (Customer Management System)                                                            *
 *Date:    August 28th, 2019                                                                                       *
 *Purpose: This is the footer page view component
 
 *Icon credit attributions:
 
 Phone:    https://www.flaticon.com/authors/freepik
 Mail:     https://www.flaticon.com/authors/roundicons
 Facebook: https://www.flaticon.com/authors/freepik
\******************************************************************************************************************/

import React from "react";

const Footer = ({ userIsLoggedIn, loggedInUser }) => {

  const handleProfileRedirect = () => {
    window.location.assign("/profile");
  };
  return (
    <div className="contact_form_div">
      <p>
        <a href="tel:402-714-2250">
          <img
            className="contact_icon"
            alt="Call icon"
            src={require("../Media/phone.png")}
            height="30"
            width="30"
          />
        </a>
        <a href="mailto:codymorris282@yahoo.com">
          <img
            className="contact_icon"
            alt="Email icon"
            src={require("../Media/mail.png")}
            height="30"
            width="30"
          />
        </a>
        <a
          href="https://facebook.com/2923362337703942"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            className="contact_icon"
            alt="Facebook icon"
            src={require("../Media/facebook.png")}
            height="30"
            width="30"
          />
        </a>
      </p>
      <button
        className={
          userIsLoggedIn === "true"
            ? "profile_redirect"
            : "profile_redirect_hidden"
        }
        onClick={handleProfileRedirect}
      >
        {userIsLoggedIn === "true" ? "Profile" : ""}
      </button>
    </div>
  );
};

export default Footer;
