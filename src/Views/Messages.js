/******************************************************************************************************************\
 *File:    Messages.js                                                                                             *
 *Author:  Christopher Perault                                                                                     *
 *Project: Roofmasters CMS (Customer Management System)                                                            *
 *Date:    October 26th, 2019                                                                                      *
 *Purpose: This component will be where all messages are displayed and handled                                     *
\******************************************************************************************************************/

import React, { useState } from "react";
import axios from "axios";

const Messages = ({ loggedInUser }) => {
  //array to store messages retreived from the /message_fetch endpoint
  const messageList = [];

  const getMessages = () => {
    //set up the axios request to fetch all messages for associatedID (loggedInUsers ID)
    axios
      .post(process.env.REACT_APP_ENDPOINT + "/messages", {
        myID: "1",
        messageAction: "fetch"
      })
      .then(response => {
        alert(JSON.stringify(response.data));
        // const message_data = JSON.stringify(response.data.messages);
        // const message_object = JSON.parse(message_data);
        // console.log(JSON.stringify(message_object[0].messageContent));
      })
      .catch(error => {
        console.log("Error: " + error);
      });
  };

  //create the message form
  const messageForm = () => {};

  //set up the message object
  const message = () => {
    //return messageList.map(msg => {
    return (
      <p className="account_message_preview">
        <p onClick={getMessages}>Messages!</p>
        {/* <span className="account_message_header">{msg.from}</span>
          <br />
          <a href=".">{msg.body}</a> */}
      </p>
    );
    //});
  };

  return <div className="messages_container">{message()}</div>;
};

export default Messages;
