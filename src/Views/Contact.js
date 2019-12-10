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

  const inputStyle = {
    marginBottom: "10px",
    borderRadius: "15px"
  };
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
        } else {
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
              variant="outlined"
              style={{
                width: "50%",
                marginBottom: "10px",
                borderRadius: "15px"
              }}
              name="contact_first_name"
              value={contactFirstName}
              placeholder="First name"
              onChange={text => setContactFirstName(text.target.value)}
              InputProps={{
                style: {
                  color: "#64403e",
                  fontSize: "14px",
                  marginRight: "5px"
                }
              }}
            />
            <TextField
              variant="outlined"
              style={{
                width: "50%",
                marginBottom: "10px",
                borderRadius: "15px"
              }}
              name="contact_last_name"
              value={contactLastName}
              placeholder="Last name"
              onChange={text => setContactLastName(text.target.value)}
              InputProps={{
                style: {
                  color: "#64403e",
                  fontSize: "14px",
                  marginLeft: "5px"
                }
              }}
            />
            <br />
            <TextField
              variant="outlined"
              fullWidth
              style={inputStyle}
              name="contact_mail"
              value={contactEmail}
              placeholder="Email address"
              onChange={text => setContactEmail(text.target.value)}
              InputProps={{
                style: {
                  color: "#64403e",
                  fontSize: "14px"
                }
              }}
            />
            <br />
            <TextField
              style={inputStyle}
              multiline
              fullWidth
              variant="outlined"
              rows="5"
              rowsMax="8"
              placeholder="What can we do to help?"
              value={contactDescriptionText}
              onChange={text => setContactDescriptionText(text.target.value)}
              InputProps={{
                style: {
                  color: "#64403e",
                  fontSize: "14px"
                }
              }}
            />
            <br />
            <TextField
              variant="outlined"
              style={inputStyle}
              name="invite_code"
              fullWidth
              value={inviteCode}
              onChange={text => setInviteCode(text.target.value)}
              required
              placeholder="Please enter your invite code"
              InputProps={{
                style: {
                  color: "#64403e",
                  fontSize: "14px"
                }
              }}
            />
            <Button
              onClick={processContactForm}
              variant="contained"
              style={{ backgroundColor: "#64403e", color: "#c9cebd" }}
              size="small"
            >
              Send
            </Button>
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
