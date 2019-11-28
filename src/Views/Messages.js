/******************************************************************************************************************\
 *File:    Messages.js                                                                                             *
 *Author:  Christopher Perault                                                                                     *
 *Project: Roofmasters CMS (Customer Management System)                                                            *
 *Date:    October 26th, 2019                                                                                      *
 *Purpose: This component will be where all messages are displayed and handled                                     *
\******************************************************************************************************************/

import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import axios from "axios";

const Messages = ({ loggedInUser }) => {
  const userID = loggedInUser[0].userID;
  //hook to store messages received from backend
  const [messages, setMessages] = useState([]);
  const getMessages = () => {
    //set up the axios request to fetch all messages for associatedID (loggedInUsers ID)
    axios
      .post(process.env.REACT_APP_ENDPOINT + "/messages", {
        userID: userID
      })
      .then(response => {
        setMessages(response.data.all_messages);
      });
  };

  //create the message form
  const messageForm = () => {};

  return (
    <div className="messages_container">
      <ul>
        {messages.map(message => {
          return (
            <li key={message.messageID} className="all_messages_li">
              {message.messageContent}
            </li>
          );
        })}
      </ul>
      <Button
        variant="contained"
        size="small"
        style={{ backgroundColor: "#64403e", color: "#c9cebd" }}
        onClick={getMessages}
        fullWidth
      >
        Load all messages
      </Button>
    </div>
  );
};

export default Messages;
