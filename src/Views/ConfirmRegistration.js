/******************************************************************************************************************\
 *File:    ConfirmRegistration.js                                                                                  *
 *Author:  Christopher Perault                                                                                     *
 *Project: Roofmasters CMS (Customer Management System)                                                            *
 *Date:    November 10th, 2019                                                                                     *
 *Purpose: This view will display the form for registration confirmation                                           *
\******************************************************************************************************************/
import React, { useState, useEffect } from "react";
import axios from "axios";

const ConfirmRegistration = ({ Nav, Footer, userIsLoggedIn }) => {
  //useState hook to manage the "page loading effect"
  const [pageLoading, setPageLoading] = useState(false);
  const [emailAddress, setEmailAddress] = useState("");
  const [registrationCode, setRegistrationCode] = useState("");

  useEffect(() => {
    //get code from URL which is created on the activation email
    let code = window.location.search.replace("?code=", "");
    let parts = code.split("?email=");
    let activationCode = parts[0];
    let email = parts[1];
    //hydrate the hooks
    setEmailAddress(email);
    setRegistrationCode(activationCode);
    setPageLoading(true);
    //function to activate user account
    const confirmRegistration = () => {
      //send request back to confirm user registration code
      axios
        .post(process.env.REACT_APP_ENDPOINT + "/confirm_registration", {
          registrationCode: registrationCode,
          emailAddress: emailAddress
        })
        .then(response => {
          if (response.data.registration_verification === "Failed") {
            setRegistrationCode("");
            alert(response.data.reasoning);
          } else if (
            response.data.registration_verified_already === "Already done"
          ) {
            alert(response.data.reasoning);
            window.location.assign("/login");
          } else if (response.data.registration_verification === "Passed") {
            setPageLoading(false);
            alert(
              "Thank you confirming your email address! You will now be redirected to the login page."
            );
            window.location.assign("/login");
          }
        });
    };

    if (email !== "" && activationCode !== "") {
      //call the confirmRegistration method immediately and then redirect to login
      confirmRegistration();
    }
  }, [emailAddress, registrationCode]);

  return (
    <React.Fragment>
      <div className="topnav">
        <Nav userIsLoggedIn={userIsLoggedIn} />
      </div>
      <div className="wrapper_div">
        <h1 className="wrapper_header">Email Address Confirmation</h1>
        <div className="registration_confirmation_wrapper_body_div">
          <div className="registration_confirmation_form_div">
            <p className="loading-message">
              {pageLoading ? "Verifying your request..." : ""}
            </p>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ConfirmRegistration;
