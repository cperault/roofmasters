/******************************************************************************************************************\
 *File:    RemoveAccount.js                                                                                        *
 *Author:  Christopher Perault                                                                                     *
 *Project: Roofmasters CMS (Customer Management System)                                                            *
 *Date:    December 7th, 2019                                                                                      *
 *Purpose: This component will represent the view in which a user can delete their account                         *
\******************************************************************************************************************/

import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import axios from "axios";

const RemoveAccount = ({ loggedInUser }) => {
  //hooks to manage state for the email and password
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //hook to store errors from form
  const [errors, setErrors] = useState([]);
  //method to handle the account deletion
  const handleAccountDeletion = (email, password) => {
    //delete the user's account
    let userID = loggedInUser[0].userID;
    axios
      .post(process.env.REACT_APP_ENDPOINT + "/delete_account", {
        userID: userID,
        email: email,
        password: password
      })
      .then(response => {
        if (response.data.validation === "Failed") {
          let error = JSON.stringify(response.data.reasoning);
          setErrors(JSON.parse(error));
        } else if (response.data.closed) {
          setErrors([]);
          alert(response.data.closed);
          localStorage.clear();
          window.location.assign("/landing");
        }
      });
  };
  return (
    <div className="password_reset_container">
      <div className="password_reset_body">
        <h3 className="password_reset_div_header">
          Enter your email and password to confirm deletion.
        </h3>
        <TextField
          id="email_confirmation"
          label="Email address"
          value={email}
          fullWidth
          InputProps={{
            style: {
              color: "#64403e",
              marginBottom: "10px",
              fontSize: "14px"
            }
          }}
          variant="outlined"
          onChange={text => setEmail(text.target.value)}
        />
        <TextField
          type="password"
          id="password_confirmation"
          label="Password"
          value={password}
          fullWidth
          InputProps={{
            style: {
              color: "#64403e",
              fontSize: "14px"
            }
          }}
          variant="outlined"
          onChange={text => setPassword(text.target.value)}
        />
        <Button
          onClick={() => handleAccountDeletion(email, password)}
          variant="contained"
          style={{
            marginTop: "10px",
            backgroundColor: "#64403e",
            color: "#c9cebd",
            float: "right"
          }}
          size="small"
        >
          Delete my account
        </Button>
      </div>
      {errors.length > 0 ? (
        <div className="delete-account-error-div">
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
  );
};

export default RemoveAccount;
