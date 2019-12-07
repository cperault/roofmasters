/******************************************************************************************************************\
 *File:    Messages.js                                                                                             *
 *Author:  Christopher Perault                                                                                     *
 *Project: Roofmasters CMS (Customer Management System)                                                            *
 *Date:    October 26th, 2019                                                                                      *
 *Purpose: This component will be where all messages are displayed and handled                                     *
\******************************************************************************************************************/

import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import axios from "axios";
import AutorenewIcon from "@material-ui/icons/Autorenew";
import moment from "moment";

const Messages = ({ loggedInUser, handleModal }) => {
  const userID = loggedInUser[0].userID;
  //hook to store messages received from backend
  const [messages, setMessages] = useState([]);
  const [messagesLoaded, setMessagesLoaded] = useState(false);
  //get all messages from DB for logged in user and store in array
  const getMessages = () => {
    //set up the axios request to fetch all messages for associatedID (loggedInUsers ID)
    axios
      .post(process.env.REACT_APP_ENDPOINT + "/messages", {
        userID: userID
      })
      .then(response => {
        setMessages(response.data.all_messages);
        setMessagesLoaded(true);
      });
  };

  //when the component is loaded, it will call the `getMessages()` method once; user can refresh if they want, manually
  useEffect(() => {
    getMessages();
  }, [messagesLoaded]);

  //method to form message date/time
  const formatDateFromDB = dateReceived => {
    let timestamp = dateReceived;
    let timestampFormatted = moment(timestamp).format("MMM Do [at] hh:ssa");
    return timestampFormatted;
  };

  return (
    <div className="messages_div">
      <table className="messages_table">
        <tbody className="messages_table_row">
          <tr>
            <th className="messages_table_header">From</th>
            <th className="messages_table_header">Message</th>
            <th className="messages_table_header">Date</th>
          </tr>
          {messages.map(message => {
            return (
              <tr key={message.messageID}>
                <td className="messages_table_detail_from">
                  {message.senderName}
                </td>
                <td className="messages_table_detail_content">
                  <span
                    key={message.messageID}
                    className="messages_table_detail_content_item"
                    onClick={() => handleModal("open", message, "Messages")}
                  >
                    {message.messageContent
                      .substring(0, message.messageContent.length / 2)
                      .trim() + "..."}
                  </span>
                </td>
                <td className="messages_table_detail_time">
                  {formatDateFromDB(message.messageTimeStamp)}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <Button
        variant="contained"
        size="small"
        style={{ backgroundColor: "#64403e", color: "#c9cebd" }}
        onClick={getMessages}
        startIcon={<AutorenewIcon />}
      >
        Refresh List
      </Button>
    </div>
  );
};

export default Messages;
