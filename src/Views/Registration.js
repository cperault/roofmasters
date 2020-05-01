/******************************************************************************************************************\
 *File:    Registration.js                                                                                         *
 *Author:  Christopher Perault                                                                                     *
 *Project: Roofmasters CMS (Customer Management System)                                                            *
 *Date:    August 8th, 2019                                                                                        *
 *Purpose: This is the registration page view.                                                                     *
\******************************************************************************************************************/
import React, { useState } from "react";
import axios from "axios";
import { TextField, Button } from "@material-ui/core";
import NumberFormat from "react-number-format";
import { makeStyles } from "@material-ui/core/styles";

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
  const [addressName, setAddressName] = useState("");
  const [addressCity, setAddressCity] = useState("");
  const [addressState, setAddressState] = useState("");
  const [addressZip, setAddressZip] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //useState hook to manage the "page loading effect"
  const [pageLoading, setPageLoading] = useState(false);
  const [errors, setErrors] = useState([]);

  const inputStyleOne = {
    marginBottom: "10px",
    width: "50%",
    zIndex: "0"
  };
  const inputStyleTwo = {
    marginBottom: "10px",
    width: "100%",
    zIndex: "0"
  };

  const StyledTextField = makeStyles({
    root: {
      '& label.Mui-focused': {
        color: '#253237',
      },
      '& .MuiInput-underline:after': {
        borderBottomColor: '#253237',
      },
      '& .MuiOutlinedInput-root': {
        '& fieldset': {
          borderColor: '#253237',
        },
        '&:hover fieldset': {
          borderColor: '#253237',
        },
        '&.Mui-focused fieldset': {
          borderColor: '#253237',
        },
      },
    },
  });
  const classes = StyledTextField();

  //submit email address and password from registration for account to be created
  //note: data will be sanitized server-side but protected by HTTPS client side
  const registerUser = (
    firstName,
    lastName,
    addressName,
    addressCity,
    addressState,
    addressZip,
    phone,
    email,
    password,
    inviteCode
  ) => {
    //page loading effect should display while the registration request is being processed
    setPageLoading(true);
    //extract first and last inital for avatar
    let firstInitial = firstName.substring(1, 0);
    let lastInitial = lastName.substring(1, 0);
    let userAvatarText = firstInitial + lastInitial;
    //send axios POST request
    axios
      .post(process.env.REACT_APP_ENDPOINT + "/register", {
        firstName: firstName,
        lastName: lastName,
        addressName: addressName,
        addressCity: addressCity,
        addressState: addressState,
        addressZip: addressZip,
        phone: phone,
        email: email,
        password: password,
        inviteCode: inviteCode,
        userAvatar: userAvatarText
      })
      .then(response => {
        setPageLoading(false);
        if (response.data.status === "result") {
          alert(JSON.stringify(response.data.details));
        } else if (response.data.invite_response === "Denied.") {
          setInviteCode("Invalid invite code.");
        } else if (response.data.verification === "Failed") {
          let errors = JSON.stringify(response.data.reasoning);
          setErrors(JSON.parse(errors));
        } else if (response.data.email_status === "Failed") {
          console.log(response.data.reasoning);
        } else {
          //prompt user to check their email and click the link
          alert(
            "Thank you for registering! Please check your email and click the activation link."
          );
          //take the user to the login page
          window.location.assign("/login");
        }
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
  };

  return (
    <React.Fragment>
      <div className="topnav">
        <Nav userIsLoggedIn={userIsLoggedIn} />
      </div>
      <div className="wrapper_div">
        <h1 className="wrapper_header">Create Your Account</h1>
        <div className="registrationg_wrapper_body_div">
          <div className="registration_form_div">
            <TextField
              className={classes.root}
              label="First name"
              variant="outlined"
              style={inputStyleOne}
              name="signup_first_name"
              value={firstName}
              onChange={text => setFirstName(text.target.value)}
              InputProps={{
                style: {
                  color: "#253237",
                  marginRight: "5px",
                  fontSize: "14px"
                }
              }}
            />
            <TextField
              className={classes.root}
              label="Last name"
              variant="outlined"
              style={inputStyleOne}
              name="signup_last_name"
              value={lastName}
              onChange={text => setLastName(text.target.value)}
              InputProps={{
                style: {
                  color: "#253237",
                  fontSize: "14px"
                }
              }}
            />
            <br />
            <TextField
              className={classes.root}
              label="Address"
              variant="outlined"
              style={inputStyleTwo}
              name="signup_address_name"
              value={addressName}
              onChange={text => setAddressName(text.target.value)}
              InputProps={{
                style: {
                  color: "#253237",
                  fontSize: "14px"
                }
              }}
            />
            <br />
            <TextField
              className={classes.root}
              label="City"
              variant="outlined"
              style={{ width: "40%", marginBottom: "10px", zIndex: "0" }}
              name="signup_address_city"
              value={addressCity}
              onChange={text => setAddressCity(text.target.value)}
              InputProps={{
                style: {
                  color: "#253237",
                  fontSize: "14px",
                  marginRight: "5px"
                }
              }}
            />
            <TextField
              className={classes.root}
              label="State"
              variant="outlined"
              style={{ width: "30%", marginBottom: "10px", zIndex: "0" }}
              name="signup_address_state"
              value={addressState}
              onChange={text => setAddressState(text.target.value)}
              InputProps={{
                style: {
                  color: "#253237",
                  marginRight: "5px",
                  fontSize: "14px"
                }
              }}
              inputProps={{ maxLength: 2 }}
            />
            <TextField
              className={classes.root}
              label="Zip code"
              customInput={TextField}
              variant="outlined"
              style={{ width: "30%", marginBottom: "10px", zIndex: "0" }}
              name="signup_address_zip"
              value={addressZip}
              onChange={text => setAddressZip(text.target.value)}
              InputProps={{
                style: {
                  color: "#253237",
                  fontSize: "14px"
                }
              }}
              inputProps={{ maxLength: 5 }}
            />
            <br />
            <NumberFormat
              className={classes.root}
              label="Phone number"
              customInput={TextField}
              variant="outlined"
              value={phone}
              name="signup_phone"
              onChange={text => setPhone(text.target.value)}
              style={inputStyleTwo}
              format="###-###-####"
              mask="_"
              InputProps={{
                style: {
                  color: "#253237",
                  fontSize: "14px"
                }
              }}
            />
            <br />
            <TextField
              className={classes.root}
              label="Email address"
              variant="outlined"
              style={inputStyleTwo}
              name="signup_email"
              value={email}
              onChange={text => setEmail(text.target.value)}
              InputProps={{
                style: {
                  color: "#253237",
                  fontSize: "14px"
                }
              }}
            />
            <br />
            <TextField
              className={classes.root}
              label="Password"
              type="password"
              variant="outlined"
              style={inputStyleTwo}
              name="signup_password"
              value={password}
              onChange={text => setPassword(text.target.value)}
              InputProps={{
                style: {
                  color: "#253237",
                  fontSize: "14px"
                }
              }}
            />
            <br />
            <TextField
              className={classes.root}
              label="Please enter your invite code"
              variant="outlined"
              style={inputStyleTwo}
              name="invite_code"
              value={inviteCode}
              onChange={text => setInviteCode(text.target.value)}
              InputProps={{
                style: {
                  color: "#253237",
                  fontSize: "14px"
                }
              }}
            />
            <br />
            <Button
              onClick={() =>
                registerUser(
                  firstName,
                  lastName,
                  addressName,
                  addressCity,
                  addressState,
                  addressZip,
                  phone,
                  email,
                  password,
                  inviteCode
                )
              }
              variant="contained"
              size="small"
              style={{ backgroundColor: "#9DB4C0", color: "#253237" }}
            >
              Register
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
        </div>
        <p className="loading-message">
          {pageLoading ? "Getting you registered..." : ""}
        </p>
      </div>
    </React.Fragment>
  );
};

export default Registration;
