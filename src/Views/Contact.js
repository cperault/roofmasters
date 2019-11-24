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
  userIsLoggedIn,
  loggedInUser,
  Nav,
  Footer,
  inviteCode,
  setInviteCode
}) => {
  //hook to store entered text in contact form
  let [contactName, setContactName] = useState("");
  let [contactEmail, setContactEmail] = useState("");
  let [contactDescriptionText, setContactDescriptionText] = useState("");
  let user = loggedInUser;
  let userName = user[0].firstName + " " + user[0].lastName;
  let userEmail = user[0].emailAddress;

  const inputStyle = {
    marginBottom: "10px",
    border: "solid 1px #838e83",
    borderRadius: "5px"
  };
  //set up the request to PHP backend for contact form processing
  const processContactForm = () => {
    let formData = [];
    if (userIsLoggedIn) {
      formData = [userName, userEmail, contactDescriptionText, inviteCode];
    } else {
      formData = [
        contactName,
        contactEmail,
        contactDescriptionText,
        inviteCode
      ];
    }
    //the contact form is valid; submit the backend request
    axios
      .post("https://roofmasters-backend.herokuapp.com/index.php/contact", {
        contactName: formData[0],
        contactEmail: formData[1],
        contactDescriptionText: formData[2],
        inviteCode: formData[3]
      })
      .then(response => {
        if (response.data.invite_response === "Denied.") {
          setInviteCode("Invite code is invalid.");
        } else if (response.data) {
          alert(
            "Your message was submitted! We will be in touch with you as soon possible.\n" +
              response.data
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
        <h1 className="wrapper_header">Need to Get Ahold of Us?</h1>
        <div className="contact_wrapper_body_div">
          <div className="contact_form_div">
            <br />
            <TextField
              variant="outlined"
              fullWidth
              style={inputStyle}
              name="contact_name"
              value={userIsLoggedIn === "false" ? contactName : userName}
              placeholder="Your Name"
              onChange={text => setContactName(text.target.value)}
              InputProps={{
                style: {
                  color: "#64403e"
                }
              }}
            />
            <br />
            <TextField
              variant="outlined"
              fullWidth
              style={inputStyle}
              name="contact_mail"
              value={userIsLoggedIn === "false" ? contactEmail : userEmail}
              placeholder="Your Email Address"
              onChange={text => setContactEmail(text.target.value)}
              InputProps={{
                style: {
                  color: "#64403e"
                }
              }}
            />
            <br />
            <TextField
              style={inputStyle}
              multiline
              fullWidth
              variant="outlined"
              rows="1"
              rowsMax="8"
              placeholder="Let us know how we can help..."
              value={contactDescriptionText}
              onChange={text => setContactDescriptionText(text.target.value)}
              InputProps={{
                style: {
                  color: "#64403e"
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
                  color: "#64403e"
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
          <Footer userIsLoggedIn={userIsLoggedIn} />
        </footer>
      </div>
    </React.Fragment>
  );
};

export default Contact;
