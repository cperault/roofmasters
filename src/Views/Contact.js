/******************************************************************************************************************\
 *File:    Contact.js                                                                                              *
 *Author:  Christopher Perault                                                                                     *
 *Project: Roofmasters CMS (Customer Management System)                                                            *
 *Date:    August 8th, 2019                                                                                        *
 *Purpose: This is the contact page view component.                                                                *
\******************************************************************************************************************/
import React, { useState } from "react";
import Validation from "../Models/Validation.js";
import axios from "axios";

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

  const changeContactInfoHandler = () => {
    //if user wants to use different email address and/or name, they can do that
  };

  //set up the request to PHP backend for contact form processing
  const processContactForm = () => {
    let formData = [];
    if (userIsLoggedIn) {
      formData = [userName, userEmail, contactDescriptionText, inviteCode];
    } else {
      formData = [contactName, contactEmail, contactDescriptionText, inviteCode];
    }
    //make sure contact form is valid before sending
    if (Validation(formData, "contact")) {
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
    } else {
      //contact form is missing data or invalid
      alert(
        "Sorry, but you're missing some data. Please correct before submitting."
      );
    }
  };
  return (
    <div className="wrapper_div">
      <h1 className="wrapper_header">Need to Get Ahold of Us?</h1>
      <nav>
        <Nav userIsLoggedIn={userIsLoggedIn} />
      </nav>
      <div className="contact_wrapper_body_div">
        <div className="contact_form_div">
          <br />
          <input
            type="text"
            name="contact_name"
            value={userIsLoggedIn === "false" ? contactName : userName}
            placeholder="Your Name"
            onChange={text => setContactName(text.target.value)}
          />
          <br />
          <input
            type="text"
            name="contact_mail"
            value={userIsLoggedIn === "false" ? contactEmail : userEmail}
            placeholder="Your Email Address"
            onChange={text => setContactEmail(text.target.value)}
          />
          <br />
          <textarea
            name="contact_message"
            maxLength="300"
            placeholder="Let us know how we can help..."
            value={contactDescriptionText}
            onChange={text => setContactDescriptionText(text.target.value)}
          />
          <br />
          <input
            type="text"
            name="invite_code"
            value={inviteCode}
            onChange={text => setInviteCode(text.target.value)}
            placeHolder="Please enter your invite code"
          />
          <button className="contact_form_button" onClick={processContactForm}>
            Send
          </button>
          <button onClick={changeContactInfoHandler}>
            Use Different Contact Info
          </button>
        </div>
      </div>
      <footer>
        <Footer userIsLoggedIn={userIsLoggedIn} loggedInUser={loggedInUser} />
      </footer>
    </div>
  );
};

export default Contact;
