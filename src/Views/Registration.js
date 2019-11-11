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
import { TextField, Button } from "@material-ui/core";

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
  const [registrationCode, setRegistrationCode] = useState("");
  const [userNeedsToConfirm, setUserNeedsToConfirm] = useState(false);
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
            //prompt user to confirm registration by entering the code they received via email
            confirmRegistration();
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

  //prompt user to enter the code they receive via email before proceeding
  const confirmRegistration = (registrationCode, email) => {
    setUserNeedsToConfirm(true);

    setPageLoading(true);
    //send request back to confirm user registration code
    axios
      .post(
        "https://roofmasters-backend.herokuapp.com/index.php/confirm_registration",
        {
          registrationCode: registrationCode,
          email: email
        }
      )
      .then(response => {
        if (response.data.verification === "Failed") {
          setRegistrationCode("Invalid registration code.");
        } else if (response.data) {
          setPageLoading(false);
          alert(
            "Thank you confirming your email address. You will now be redirected to the login page."
          );
          window.location.assign("/login");
        }
      });
  };

  return userNeedsToConfirm === "" ? (
    <div className="wrapper_div">
      <h1 className="wrapper_header">Let's Get You Registered</h1>
      <nav>
        <Nav />
      </nav>
      <div className="registrationg_wrapper_body_div">
        <div className="registration_form_div">
          <p className="register_form_div_header">
            Please enter your information and create a unique, secure password.
          </p>
          <br />
          <TextField
            variant="outlined"
            fullWidth
            style={{ marginBottom: "10px" }}
            name="signup_first_name"
            value={firstName}
            onChange={text => setFirstName(text.target.value)}
            placeholder="First Name"
          />
          <br />
          <TextField
            variant="outlined"
            fullWidth
            style={{ marginBottom: "10px" }}
            name="signup_last_name"
            value={lastName}
            onChange={text => setLastName(text.target.value)}
            placeholder="Last Name"
          />
          <br />
          <TextField
            variant="outlined"
            fullWidth
            style={{ marginBottom: "10px" }}
            name="signup_phone_number"
            value={phoneNumber}
            onChange={text => setPhoneNumber(text.target.value)}
            placeholder="Phone Number (no dashes)"
          />
          <br />
          <TextField
            variant="outlined"
            fullWidth
            style={{ marginBottom: "10px" }}
            name="signup_email"
            value={email}
            onChange={text => setEmail(text.target.value)}
            placeholder="Email"
          />
          <br />
          <TextField
            type="password"
            variant="outlined"
            fullWidth
            style={{ marginBottom: "10px" }}
            name="signup_password"
            value={password}
            onChange={text => setPassword(text.target.value)}
            placeholder="Password"
          />
          <br />
          <br />
          <TextField
            variant="outlined"
            fullWidth
            style={{ marginBottom: "10px" }}
            name="invite_code"
            value={inviteCode}
            onChange={text => setInviteCode(text.target.value)}
            placeholder="Please enter your invite code"
          />
          <br />
          <Button
            onClick={() =>
              registerUser(
                firstName,
                lastName,
                phoneNumber,
                email,
                password,
                inviteCode
              )
            }
            variant="contained"
            color="primary"
            size="small"
          >
            Register
          </Button>
        </div>
      </div>
      <p className="loading-message">
        {pageLoading ? "Authentication request in progress..." : ""}
      </p>
      <footer>
        <Footer userIsLoggedIn={userIsLoggedIn} loggedInUser={loggedInUser} />
      </footer>
    </div>
  ) : (
    <div>
      <p className="register_form_div_header">
        We have emailed you a confirmation code to the email you provided.
        Please enter that below.
      </p>
      <TextField
        variant="outlined"
        fullWidth
        style={{ marginBottom: "10px" }}
        name="registration_code"
        value={registrationCode}
        onChange={text => setRegistrationCode(text.target.value)}
        placeholder="Confirmation code"
      ></TextField>
      <br />
      <Button
        onClick={() => confirmRegistration(registrationCode, email)}
        variant="contained"
        color="primary"
        size="small"
      >
        Verify
      </Button>
    </div>
  );
};

export default Registration;
