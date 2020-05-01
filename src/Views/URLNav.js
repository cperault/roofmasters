/******************************************************************************************************************\
 *File:    URLNav.js                                                                                               *
 *Author:  Christopher Perault                                                                                     *
 *Project: Roofmasters CMS (Customer Management System)                                                            *
 *Date:    August 28th, 2019                                                                                       *
 *Purpose: This component is responsible for storing and setting up nav links.                                     *
\******************************************************************************************************************/
import React, { useState } from "react";

const URLNav = ({ userIsLoggedIn }) => {
  const businessLinks = [
    { id: 1, name: "Roofmasters", value: "/landing" },
    { id: 2, name: "About", value: "/about" },
    { id: 3, name: "Services", value: "/services" },
    {
      id: 4,
      name: userIsLoggedIn === "false" ? "Contact Us" : "",
      value: userIsLoggedIn === "false" ? "/contact" : ""
    }
  ];

  const userLinks = [
    {
      id: 5,
      name: userIsLoggedIn === "false" ? "Login" : "",
      value: userIsLoggedIn === "false" ? "/login" : ""
    },
    {
      id: 6,
      name: userIsLoggedIn === "false" ? "" : "Profile",
      value: userIsLoggedIn === "false" ? "" : "/profile"
    }
  ];

  const sidebarLinks = businessLinks.concat(userLinks);

  const [width, setWidth] = useState("");
  const [marginLeft, setMarginLeft] = useState("");

  const openNav = () => {
    //open the sidenav menu
    setWidth("250px");
  };

  const closeNav = () => {
    //close
    setWidth("0px");
    setMarginLeft("0px");
  };

  const navRedirectHandler = link => {
    window.location.assign(link);
  };

  return (
    <React.Fragment>
      <div className="top-nav">
        <div className="business-nav">
          {businessLinks
            .map(link => {
              return (
                <div className="top-nav-link" onClick={() => navRedirectHandler(link.value)}>{link.name}</div>
              );
            })}
        </div>
        <div className="user-nav">
          {userLinks
            .filter(link => link.name !== "")
            .map(link => {
              return (
                <div className="top-nav-link" onClick={() => navRedirectHandler(link.value)}>{link.name}</div>
              )
            })}
        </div>
      </div>
      <div
        id="mySidebar"
        className="sidebar"
        style={{ width: width, marginLeft: marginLeft }}
      >
        <p className="closebtn" onClick={closeNav}>
          &times;
        </p>
        {sidebarLinks
          .filter(link => link.name !== "")
          .map(link => {
            return (
              <a key={link.id} href={link.value}>
                {link.name}
              </a>
            );
          })}
      </div>
      <div id="main">
        <button className="openbtn" onClick={openNav}>
          &#9776;
        </button>
      </div>
    </React.Fragment >
  );
};

export default URLNav;
