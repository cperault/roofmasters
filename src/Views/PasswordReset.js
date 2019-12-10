/******************************************************************************************************************\
 *File:    PasswordReset.js                                                                                        *
 *Author:  Christopher Perault                                                                                     *
 *Project: Roofmasters CMS (Customer Management System)                                                            *
 *Date:    December 6th, 2019                                                                                      *
 *Purpose: This component represents the view in which a user can reset their account password                     *
\******************************************************************************************************************/

import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import SaveIcon from "@material-ui/icons/Save";
import Check from "@material-ui/icons/Check";

import axios from "axios";

const PasswordReset = ({ loggedInUser }) => {
  //hooks to store form values
  const [password, setPassword] = useState("");
  const [passwordConfirmed, setPasswordConfirmed] = useState("");
  //hook to store errors from form
  const [errors, setErrors] = useState([]);
  //function to update user's password
  //hook to handle icon for password reset process
  const [buttonIcon, setButtonIcon] = useState(<SaveIcon />);
  //hook to handle button text for password reset process
  const [buttonStatus, setButtonStatus] = useState("Save");
  const updatePassword = (newPassword, newPasswordConfirmed) => {
    //check to make sure both fields match before submitting update request
    if (newPassword !== newPasswordConfirmed) {
      setErrors(["Password fields do not match."]);
    } else {
      //set up axios request
      axios
        .post(process.env.REACT_APP_ENDPOINT + "/reset_password", {
          new_password: newPassword,
          new_password_confirmed: newPasswordConfirmed,
          email_address: loggedInUser[0].emailAddress
        })
        .then(response => {
          if (response.data.verification === "Failed") {
            let error = JSON.stringify(response.data.reasoning);
            setErrors(JSON.parse(error));
          } else if (response.data.verification === "Password reset") {
            setErrors([]);
            //update button icon
            setButtonIcon(<Check />);
            //update button text
            setButtonStatus("Updated!");
          }
        })
        .catch(error => {
          console.log("Uh oh..." + error);
        });
    }
  };
  return (
    <div className="password_reset_container">
      <div className="password_reset_body">
        <h1 className="password_reset_div_header">
          Please enter a new password.
        </h1>
        <TextField
          id="new_password"
          label="New Password"
          value={password}
          fullWidth
          InputProps={{
            style: {
              color: "#64403e",
              marginBottom: "10px",
              fontSize: "14px"
            }
          }}
          variant="outlined"
          onChange={text => setPassword(text.target.value)}
        />
        <TextField
          id="new_password_confirmed"
          label="Confirm New Password"
          value={passwordConfirmed}
          fullWidth
          InputProps={{
            style: {
              color: "#64403e",
              fontSize: "14px"
            }
          }}
          variant="outlined"
          onChange={text => setPasswordConfirmed(text.target.value)}
        />
        <Button
          onClick={() => updatePassword(password, passwordConfirmed)}
          variant="contained"
          style={{
            marginTop: "10px",
            backgroundColor: "#64403e",
            color: "#c9cebd",
            float: "right"
          }}
          size="small"
          startIcon={buttonIcon}
        >
          {buttonStatus}
        </Button>
        <br />
        {errors.length > 0 ? (
          <div className="password-reset-error-div">
            <h2>Please correct the following:</h2>
            <ul>
              {errors.map(e => {
                return <li>-{e}</li>;
              })}
            </ul>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default PasswordReset;
