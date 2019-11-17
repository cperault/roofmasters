/******************************************************************************************************************\
 *File:    URLNav.js                                                                                               *
 *Author:  Christopher Perault                                                                                     *
 *Project: Roofmasters CMS (Customer Management System)                                                            *
 *Date:    August 28th, 2019                                                                                       *
 *Purpose: This component is responsible for storing and setting up nav links.                                     *
\******************************************************************************************************************/

import React from "react";
import { Tab } from "@material-ui/core";
const URLNav = ({ userIsLoggedIn }) => {
  const navArray = [
    { name: "Home", value: "/landing" },
    { name: "Who We Are", value: "/about" },
    { name: "Services", value: "/services" },
    { name: "Contact Us", value: "/contact" },
    {
      name: userIsLoggedIn === "false" ? "Login" : "",
      value: userIsLoggedIn === "false" ? "/login" : ""
    },
    {
      name: userIsLoggedIn === "false" ? "" : "Profile",
      value: userIsLoggedIn === "false" ? "" : "/profile"
    }
  ];

  const navRedirectHandler = link => {
    window.location.assign(link);
  };

  return navArray
    .filter(link => link.name !== "")
    .map(link => {
      return (
        <Tab
          label={link.name}
          onClick={() => navRedirectHandler(link.value)}
          style={{
            backgroundColor: "#746d75",
            border: "solid 1px #ede6f2",
            opacity: "1",
            width: "auto",
            height: "auto",
            margin: "5px",
            borderRadius: "10px",
            color: "#ede6f2",
            position: "static"
          }}
        />
      );
    });
};

export default URLNav;
