/******************************************************************************************************************\
 *File:    URLNav.js                                                                                               *
 *Author:  Christopher Perault                                                                                     *
 *Project: Roofmasters CMS (Customer Management System)                                                            *
 *Date:    August 28th, 2019                                                                                       *
 *Purpose: This component is responsible for storing and setting up nav links.                                     *
\******************************************************************************************************************/

import React from "react";
const URLNav = ({ userIsLoggedIn }) => {
  const navArray = [
    { name: "Home", value: "/landing" },
    { name: "Who We Are", value: "/about" },
    { name: "Services", value: "/services" },
    { name: "Contact Us", value: "/contact" },
    {
      name: userIsLoggedIn === "false" ? "Log In" : "Log Out",
      value: userIsLoggedIn === "false" ? "/login" : "/logout"
    }
  ];
  const navRedirectHandler = link => {
    window.location.assign(link);
  };

  return (
    <ul className="wrapper_nav_ul">
      {navArray.map(link => {
        return (
          <form key={link.name + "_form_key"}>
            <li key={link.name + "_form_key"} className="wrapper_nav_li">
              <input
                type="button"
                onClick={() => navRedirectHandler(link.value)}
                value={link.name}
              />
            </li>
          </form>
        );
      })}
    </ul>
  );
};

export default URLNav;
