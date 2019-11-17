/******************************************************************************************************************\
 *File:    Login.js                                                                                                *
 *Author:  Christopher Perault                                                                                     *
 *Project: Roofmasters CMS (Customer Management System)                                                            *
 *Date:    August 28th, 2019                                                                                       *
 *Purpose: This is the login page view component.                                                                  *
\******************************************************************************************************************/
import React, { useState } from "react";
import axios from "axios";
import { TextField, Button } from "@material-ui/core";

const Login = ({ loggedInUser, userIsLoggedIn, stateHandler, Nav, Footer }) => {
  //useState hooks to store email and password from the form
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let user = [];
  //useState hook to manage the "page loading effect"
  const [pageLoading, setPageLoading] = useState(false);
  //useState hook to store errors from form
  const [errors, setErrors] = useState([]);
  const inputStyle = {
    marginBottom: "10px",
    border: "solid 1px #ede6f2",
    borderRadius: "5px"
  };
  //authentication handler function
  const authenticate = (email, password) => {
    //page-loading effect should display while request is in progress
    setPageLoading(true);
    axios
      .post(
        "https://roofmasters-backend.herokuapp.com/index.php/authenticate",
        {
          email: email,
          password: password
        }
      )
      .then(response => {
        if (response.data.verification === "Failed") {
          let errors = JSON.stringify(response.data.reasoning);
          setErrors(JSON.parse(errors));
        } else if (response.data.verification === "Verification needed") {
          alert(response.data.reasoning);
          window.location.assign("/confirm_registration");
        } else if (response.data.verification === "Password does not match.") {
          alert("Incorrect credentials, please try again.");
          window.location.reload();
        } else if (response.data.verification === "Password verified.") {
          const user_data = JSON.stringify(response.data.user);
          const user_object = JSON.parse(user_data);

          /*
        User Object from back end will return as:
        user_object[index].value
            [0] for .userID
            [1] for .firstName
            [2] for .lastName
            [3] for .phoneNumber
            [4] for .emailAddress
        */

          user = [
            {
              userID: user_object[0].userID,
              firstName: user_object[1].firstName,
              lastName: user_object[2].lastName,
              phoneNumber: user_object[3].phoneNumber,
              emailAddress: user_object[4].emailAddress
            }
          ];
          localStorage.setItem("loggedIn", "true");
          localStorage.setItem("user", JSON.stringify(user));
          stateHandler();
          window.location.assign("/profile");
        }
        setPageLoading(false);
      })
      .catch(error => {
        setPageLoading(false);
        if (String(error) === "Error: Network Error") {
          alert(
            "Uh oh, looks like there was an issue talking to the server. Please contact us or try back in a few minutes."
          );
        } else {
          console.log(error);
        }
      });
    //end of authenticate method
  };

  /* 
    This method is fired off when user presses Return key at log-in screen
    note: 'key' will be passed from onKeyUp event as number; 13 is Enter key.
  */
  const returnKeyPressedHandler = (key, email = "", password = "") => {
    if (email.trim() !== "" && password !== "") {
      if (key === 13) {
        authenticate(email, password);
      }
    }
  };

  return (
    <div className="wrapper_div">
      <h1 className="wrapper_header">Let's Get You Signed In</h1>
      <nav>
        <Nav userIsLoggedIn={userIsLoggedIn} />
      </nav>
      <div className="login_wrapper_body_div">
        <div className="login_form_div">
          <br />
          <TextField
            name="login_email"
            value={email}
            style={inputStyle}
            fullWidth
            InputProps={{
              style: {
                color: "#ede6f2"
              }
            }}
            variant="outlined"
            onChange={text => setEmail(text.target.value)}
            placeholder="Email"
            onKeyUp={e => returnKeyPressedHandler(e.keyCode, email, password)}
          />
          <br />
          <TextField
            type="password"
            name="login_password"
            style={inputStyle}
            InputProps={{
              style: {
                color: "#ede6f2"
              }
            }}
            fullWidth
            variant="outlined"
            value={password}
            onChange={text => setPassword(text.target.value)}
            placeholder="Password"
            onKeyUp={e => returnKeyPressedHandler(e.keyCode, email, password)}
          />
          <br />
          <Button
            onClick={() => authenticate(email, password)}
            variant="contained"
            style={{ backgroundColor: "#8acdea" }}
            size="small"
          >
            Login
          </Button>
          {errors.length > 0 ? (
            <div className="registration-form-error-div">
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
        <p className="no-account-p-link">
          <a href="/registration">No account? Sign up!</a>
          <input type="hidden" name="action" value="signup" />
        </p>
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

export default Login;
