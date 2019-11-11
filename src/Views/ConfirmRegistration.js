/******************************************************************************************************************\
 *File:    ConfirmRegistration.js                                                                                  *
 *Author:  Christopher Perault                                                                                     *
 *Project: Roofmasters CMS (Customer Management System)                                                            *
 *Date:    November 10th, 2019                                                                                     *
 *Purpose: This view will display the form for registration confirmation                                           *
\******************************************************************************************************************/
import React, { useState } from "react";
import axios from "axios";
import Validation from "../Models/Validation.js";
import { TextField, Button } from "@material-ui/core";

const ConfirmRegistration = ({Nav, Footer, userRegistering}) => {
  const email = userRegistering;
  //useState hook to manage the "page loading effect"
  const [pageLoading, setPageLoading] = useState(false);
  const [registrationCode, setRegistrationCode] = useState("");
  //prompt user to enter the code they receive via email before proceeding
  const confirmRegistration = registrationCode => {
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
            "Thank you confirming your email address! You will now be redirected to the login page."
          );
          window.location.assign("/login");
        }
      });
  };

  return (
    <div className="wrapper_div">
      <h1 className="wrapper_header">Let's Get You Registered</h1>
      <nav>
        <Nav />
      </nav>
      <div className="registrationg_wrapper_body_div">
        <div className="registration_form_div">
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
      </div>
      <p className="loading-message">
        {pageLoading ? "Authentication request in progress..." : ""}
      </p>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default ConfirmRegistration;
