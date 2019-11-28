/******************************************************************************************************************\
 *File:    URLNav.js                                                                                               *
 *Author:  Christopher Perault                                                                                     *
 *Project: Roofmasters CMS (Customer Management System)                                                            *
 *Date:    August 28th, 2019                                                                                       *
 *Purpose: This component is responsible for storing and setting up nav links.                                     *
\******************************************************************************************************************/

import React, { useState } from "react";
import { Tab } from "@material-ui/core";

const URLNav = ({ userIsLoggedIn }) => {
  const navArray = [
    { id: 1, name: "Home", value: "/landing" },
    { id: 2, name: "Who We Are", value: "/about" },
    { id: 3, name: "Services", value: "/services" },
    { id: 4, name: "Contact Us", value: "/contact" },
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
      <div className="tab-nav">
        {navArray
          .filter(link => link.name !== "")
          .map(link => {
            return (
              <Tab
                key={link.id}
                label={link.name}
                onClick={() => navRedirectHandler(link.value)}
                style={{
                  backgroundColor: "#6c6061",
                  border: "solid 1px #c9cebd",
                  width: "auto",
                  height: "auto",
                  margin: "5px",
                  borderRadius: "10px",
                  color: "white",
                  position: "static"
                }}
              />
            );
          })}
      </div>
      <div
        id="mySidebar"
        className="sidebar"
        style={{ width: width, marginLeft: marginLeft }}
      >
        <p className="closebtn" onClick={closeNav}>
          &times;
        </p>
        {navArray
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
    </React.Fragment>
  );
};

export default URLNav;
