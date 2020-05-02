/******************************************************************************************************************\
 *File:    App.js                                                                                                  *
 *Author:  Christopher Perault                                                                                     *
 *Project: Roofmasters CMS (Customer Management System)                                                            *
 *Date:    August 28th, 2019                                                                                       *
 *Purpose: This is the main controller component where routing and session management are done.                    *
\******************************************************************************************************************/

import React, { useState } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import "./page_styling.css";
import Nav from "./Views/URLNav.js";
import Footer from "./Views/Footer.js";
import Landing from "./Views/Landing.js";
import About from "./Views/About.js";
import Services from "./Views/Services.js";
import Contact from "./Views/Contact.js";
import Login from "./Views/Login.js";
import Registration from "./Views/Registration.js";
import Profile from "./Views/Profile.js";
import SafeLocalStorage from "./Models/SafeLocalStorageHandler.js";
import ConfirmRegistration from "./Views/ConfirmRegistration.js";

const App = () => {
  //an invite code will prevent spam registrations to site while in development; passed to Contact.js and Registration.js
  const [inviteCode, setInviteCode] = useState("");
  //set up the ReactJS useState hook to store logged-in user across website
  const [loggedInUser, setLoggedInUser] = useState(
    JSON.parse(SafeLocalStorage("user", "json"))
  );
  //keep track of if user is logged in
  const userIsLoggedIn = SafeLocalStorage("loggedIn", "false");

  const stateHandler = () => {
    setLoggedInUser([...loggedInUser, SafeLocalStorage("user", "json")]);
  };
  return (
    /* 
      Available paths:
        /landing
        /about
        /services
        /contact
        /login
        /registration
        /confirm_registration
        /profile
        /new_job
        /open_jobs
        /completed_jobs
        /my_account
        /messages
        /billing
        /customer_billing
    */
    <BrowserRouter>
      <Route
        exact
        path={["/", "/landing"]}
        render={() => (
          <Landing
            userIsLoggedIn={userIsLoggedIn}
            loggedInUser={loggedInUser}
            Nav={Nav}
            Footer={Footer}
          />
        )}
      />
      <Route
        path={"/about"}
        render={() => (
          <About
            userIsLoggedIn={userIsLoggedIn}
            loggedInUser={loggedInUser}
            Nav={Nav}
            Footer={Footer}
          />
        )}
      />
      <Route
        path={"/services"}
        render={() => (
          <Services
            userIsLoggedIn={userIsLoggedIn}
            loggedInUser={loggedInUser}
            Nav={Nav}
            Footer={Footer}
          />
        )}
      />
      <Route
        path={"/contact"}
        render={() =>
          userIsLoggedIn === "false" ? (
            <Contact
              userIsLoggedIn={userIsLoggedIn}
              loggedInUser={loggedInUser}
              Nav={Nav}
              Footer={Footer}
              inviteCode={inviteCode}
              setInviteCode={setInviteCode}
            />
          ) : (
              <Profile
                userIsLoggedIn={userIsLoggedIn}
                loggedInUser={loggedInUser}
                Nav={Nav}
                Footer={Footer}
              />
            )
        }
      />
      <Route
        path={"/login"}
        render={() => (
          <Login
            userIsLoggedIn={userIsLoggedIn}
            stateHandler={stateHandler}
            loggedInUser={loggedInUser}
            Nav={Nav}
            Footer={Footer}
          />
        )}
      />
      <Route
        path={"/registration"}
        render={() => (
          <Registration
            userIsLoggedIn={userIsLoggedIn}
            Nav={Nav}
            Footer={Footer}
            inviteCode={inviteCode}
            setInviteCode={setInviteCode}
          />
        )}
      />
      <Route
        path={"/confirm_registration"}
        render={() => (
          <ConfirmRegistration
            Nav={Nav}
            Footer={Footer}
            userIsLoggedIn={userIsLoggedIn}
          />
        )}
      />
      <Route
        path={"/profile"}
        render={() =>
          userIsLoggedIn === "false" ? (
            <Login
              userIsLoggedIn={userIsLoggedIn}
              stateHandler={stateHandler}
              loggedInUser={loggedInUser}
              Nav={Nav}
              Footer={Footer}
            />
          ) : (
              <Profile
                userIsLoggedIn={userIsLoggedIn}
                loggedInUser={loggedInUser}
                Nav={Nav}
                Footer={Footer}
              />
            )
        }
      />
    </BrowserRouter>
  );
};

export default App;
