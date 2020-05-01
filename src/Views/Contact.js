/******************************************************************************************************************\
 *File:    Contact.js                                                                                              *
 *Author:  Christopher Perault                                                                                     *
 *Project: Roofmasters CMS (Customer Management System)                                                            *
 *Date:    August 8th, 2019                                                                                        *
 *Purpose: This is the contact page view component.                                                                *
\******************************************************************************************************************/
import React, { useState } from "react";
import axios from "axios";
import { TextField, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const Contact = ({
  Nav,
  Footer,
  inviteCode,
  setInviteCode,
  userIsLoggedIn
}) => {
  //hook to store entered text in contact form
  let [contactFirstName, setContactFirstName] = useState("");
  let [contactLastName, setContactLastName] = useState("");
  let [contactEmail, setContactEmail] = useState("");
  let [contactDescriptionText, setContactDescriptionText] = useState("");
  //hook to store errors from submission of form
  const [errors, setErrors] = useState([]);
  const inputStyle = {
    marginBottom: "10px",
    borderRadius: "15px",
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

  //set up the request to PHP backend for contact form processing
  const processContactForm = () => {
    let formData = [];
    formData = [
      contactFirstName,
      contactLastName,
      contactEmail,
      contactDescriptionText,
      inviteCode
    ];
    //the contact form is valid; submit the backend request
    axios
      .post(process.env.REACT_APP_ENDPOINT + "/contact", {
        contactFirstName: formData[0],
        contactLastName: formData[1],
        contactEmail: formData[2],
        contactDescriptionText: formData[3],
        inviteCode: formData[4]
      })
      .then(response => {
        if (response.data.invite_response === "Denied.") {
          setInviteCode("Invite code is invalid.");
        } else if (response.data.validation_response === "Rejected") {
          let errors = JSON.stringify(response.data.rejection_reason);
          setErrors(JSON.parse(errors));
        }
        else {
          alert(
            "Your message was sent. We will contact you as soon as possible."
          );
          //refresh page after the alert
          window.location.reload();
        }
      });
  };
  return (
    <React.Fragment>
      <div className="topnav">
        <Nav userIsLoggedIn={userIsLoggedIn} />
      </div>
      <div className="wrapper_div">
        <h1 className="wrapper_header">Let's Talk</h1>
        <div className="contact_wrapper_body_div">
          <div className="contact_form_div">
            <TextField
              className={classes.root}
              variant="outlined"
              style={{
                width: "50%",
                marginBottom: "10px",
                borderRadius: "15px",
                zIndex: "0"
              }}
              name="contact_first_name"
              value={contactFirstName}
              label="First name"
              onChange={text => setContactFirstName(text.target.value)}
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
              variant="outlined"
              style={{
                width: "50%",
                marginBottom: "10px",
                borderRadius: "15px",
                zIndex: "0"
              }}
              name="contact_last_name"
              value={contactLastName}
              label="Last name"
              onChange={text => setContactLastName(text.target.value)}
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
              variant="outlined"
              fullWidth
              style={inputStyle}
              name="contact_mail"
              value={contactEmail}
              label="Email address"
              onChange={text => setContactEmail(text.target.value)}
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
              style={inputStyle}
              multiline
              fullWidth
              variant="outlined"
              rows="5"
              rowsMax="8"
              label="What can we do to help?"
              value={contactDescriptionText}
              onChange={text => setContactDescriptionText(text.target.value)}
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
              variant="outlined"
              style={inputStyle}
              name="invite_code"
              fullWidth
              value={inviteCode}
              onChange={text => setInviteCode(text.target.value)}
              required
              label="Please enter your invite code"
              InputProps={{
                style: {
                  color: "#253237",
                  fontSize: "14px"
                }
              }}
            />
            <Button
              onClick={processContactForm}
              variant="contained"
              style={{ backgroundColor: "#9DB4C0", color: "#253237" }}
              size="small"
            >
              Send
            </Button>
            {errors.length > 0 ? (
              <div className="contact-us-form-error-div">
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
        <footer className="footer">
          <Footer />
        </footer>
      </div>
    </React.Fragment>
  );
};

export default Contact;
