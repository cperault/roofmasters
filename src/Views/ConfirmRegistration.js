/******************************************************************************************************************\
 *File:    ConfirmRegistration.js                                                                                  *
 *Author:  Christopher Perault                                                                                     *
 *Project: Roofmasters CMS (Customer Management System)                                                            *
 *Date:    November 10th, 2019                                                                                     *
 *Purpose: This view will display the form for registration confirmation                                           *
\******************************************************************************************************************/
import React, { useState } from "react";
import axios from "axios";
import { TextField, Button } from "@material-ui/core";

const ConfirmRegistration = ({ Nav, Footer, userIsLoggedIn }) => {
  //useState hook to manage the "page loading effect"
  const [pageLoading, setPageLoading] = useState(false);
  const [emailAddress, setEmailAddress] = useState("");
  const [registrationCode, setRegistrationCode] = useState("");
  const inputStyle = {
    marginBottom: "10px",
    border: "solid 1px #838e83",
    borderRadius: "5px"
  };
  //prompt user to enter the code they receive via email before proceeding
  const confirmRegistration = registrationCode => {
    setPageLoading(true);
    //send request back to confirm user registration code
    axios
      .post(
        "https://roofmasters-backend.herokuapp.com/index.php/confirm_registration",
        {
          registrationCode: registrationCode,
          emailAddress: emailAddress
        }
      )
      .then(response => {
        if (response.data.registration_verification === "Failed") {
          setRegistrationCode("Invalid registration code.");
          alert(response.data.reasoning);
        } else if (response.data.registration_verification === "Passed") {
          setPageLoading(false);
          alert(
            "Thank you confirming your email address! You will now be redirected to the login page."
          );
          window.location.assign("/login");
        }
      });
  };

  return (
    <React.Fragment>
      <div className="topnav">
        <Nav userIsLoggedIn={userIsLoggedIn} />
      </div>
      <div className="wrapper_div">
        <h1 className="wrapper_header">Email Address Confirmation</h1>
        <div className="registrationg_wrapper_body_div">
          <div className="registration_form_div">
            <p className="register_form_div_header">
              Please enter the confirmation code sent to the email address you
              provided.
            </p>
            <TextField
              variant="outlined"
              fullWidth
              style={inputStyle}
              name="email_address"
              value={emailAddress}
              onChange={text => setEmailAddress(text.target.value)}
              placeholder="Email address being verified"
              InputProps={{
                style: {
                  color: "#64403e"
                }
              }}
            ></TextField>
            <br />
            <TextField
              variant="outlined"
              fullWidth
              style={inputStyle}
              name="registration_code"
              value={registrationCode}
              onChange={text => setRegistrationCode(text.target.value)}
              placeholder="Confirmation code"
              InputProps={{
                style: {
                  color: "#64403e"
                }
              }}
            ></TextField>
            <br />
            <Button
              onClick={() =>
                confirmRegistration(registrationCode, emailAddress)
              }
              variant="contained"
              style={{ backgroundColor: "#64403e", color: "#c9cebd" }}
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
    </React.Fragment>
  );
};

export default ConfirmRegistration;
