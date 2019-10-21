/******************************************************************************************************************\
 *File:    Registration.js                                                                                         *
 *Author:  Christopher Perault                                                                                     *
 *Project: Roofmasters CMS (Customer Management System)                                                            *
 *Date:    August 8th, 2019                                                                                        *
 *Purpose: This is the registration page view.                                                                     *
\******************************************************************************************************************/
import React, { useState } from "react";
import axios from "axios";
import Validation from "../Models/Validation.js";

const Registration = ({
  loggedInUser,
  userIsLoggedIn,
  Nav,
  Footer,
  inviteCode,
  setInviteCode
}) => {
  //useState hooks to store first/last name, email and password from the form
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //useState hook to manage the "page loading effect"
  const [pageLoading, setPageLoading] = useState(false);

  //submit email address and password from registration for account to be created
  //note: data will be sanitized server-side but protected by HTTPS client side
  const registerUser = (
    firstName,
    lastName,
    phoneNumber,
    email,
    password,
    inviteCode
  ) => {
    //create array to hold credentials
    const credentials = [
      firstName,
      lastName,
      phoneNumber,
      email,
      password,
      inviteCode
    ];
    //Validation will be passed the credentials array as well as the form (registration). On true,
    //registration will be completed and on false, the user will be informed to retry form input.
    if (Validation(credentials, "registration")) {
      //page loading effect should display while the registration request is being processed
      setPageLoading(true);
      //send axios POST request
      axios
        .post("https://roofmasters-backend.herokuapp.com/index.php/register", {
          firstName: firstName,
          lastName: lastName,
          phoneNumber: phoneNumber,
          email: email,
          password: password,
          inviteCode: inviteCode
        })
        .then(response => {
          if (response.data.invite_response === "Denied.") {
            setInviteCode("Invite code is invalid.");
          } else if (response.data) {
            setPageLoading(false);
            alert("Thank you! You're now registered! Let's get you logged in.");
            //redirect to login once registration complete
            window.location.assign("/login");
          }
        })
        .catch(error => {
          if (
            firstName === "" ||
            lastName === "" ||
            email === "" ||
            password === "" ||
            phoneNumber === ""
          ) {
            alert(
              "All fields are required to create an account. Please try again."
            );
          } else if (String(error) === "Error: Network Error") {
            alert(
              "Uh oh, looks like there was an issue talking to the server. Please contact us or try back in a few minutes."
            );
          } else {
            console.log("Error registering your account: " + error);
          }
          //refresh the page for a new registration attempt
          window.location.reload();
        });
    } else {
      //
      alert("I'm sorry, your registration is missing credentials.");
      window.location.reload();
    }
  };
  return (
    <div className="wrapper_div">
      <h1 className="wrapper_header">Let's Get You Registered</h1>
      <nav>
        <Nav />
      </nav>
      <div className="wrapper_body_div">
        <div className="signup_form_div">
          <p>
            Please enter your information and create a unique, secure password.
          </p>
          <br />
          <input
            type="text"
            name="signup_first_name"
            value={firstName}
            onChange={text => setFirstName(text.target.value)}
            placeholder="First Name"
          />
          <br />
          <input
            type="text"
            name="signup_last_name"
            value={lastName}
            onChange={text => setLastName(text.target.value)}
            placeholder="Last Name"
          />
          <br />
          <input
            type="text"
            name="signup_phone_number"
            value={phoneNumber}
            onChange={text => setPhoneNumber(text.target.value)}
            placeholder="Phone Number (no dashes)"
          />
          <br />
          <input
            type="text"
            name="signup_email"
            value={email}
            onChange={text => setEmail(text.target.value)}
            placeholder="Email"
          />
          <br />
          <input
            type="password"
            name="signup_password"
            value={password}
            onChange={text => setPassword(text.target.value)}
            placeholder="Password"
          />
          <br />
          <br />
          <input
            type="text"
            name="invite_code"
            value={inviteCode}
            onChange={text => setInviteCode(text.target.value)}
            placeHolder="Please enter your invite code"
          />
          <br />
          <button
            onClick={() =>
              registerUser(firstName, lastName, phoneNumber, email, password, inviteCode)
            }
          >
            Register
          </button>
        </div>
      </div>
      <p className="loading-message">
        {pageLoading ? "Authentication request in progress..." : ""}
      </p>
      <footer>
        <Footer userIsLoggedIn={userIsLoggedIn} loggedInUser={loggedInUser} />
      </footer>
    </div>
  );
};

export default Registration;
