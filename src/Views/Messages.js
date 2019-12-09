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
import {
  Paper,
  List,
  ListItem,
  Avatar,
  ListSubheader,
  ListItemText,
  ListItemAvatar,
  AppBar,
  CssBaseline,
  Toolbar,
  Fab
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";

const Messages = ({ loggedInUser, handleModal }) => {
  //hook to store messages received from backend
  const [messages, setMessages] = useState([]);
  const [subject, setSubject] = useState("hello");
  //function to refresh list manually
  const refreshList = () => {
    const userID = loggedInUser[0].userID;
    //set up the axios request to fetch all messages for associatedID (loggedInUsers ID)
    axios
      .post(process.env.REACT_APP_ENDPOINT + "/messages", {
        userID: userID
      })
      .then(response => {
        setMessages(response.data.all_messages);
      });
  };

  //when the component is loaded, it will call the `getAllMessages()` method once (and only once thanks to useEffect)
  useEffect(() => {
    const userID = loggedInUser[0].userID;
    const getAllMessages = () => {
      //get all messages sent to user from the DB and store in array
      axios
        .post(process.env.REACT_APP_ENDPOINT + "/messages", {
          userID: userID
        })
        .then(response => {
          setMessages(response.data.all_messages);
        });
    };
    getAllMessages();
  }, [loggedInUser]);

  //method to form message date/time
  const formatDateFromDB = dateReceived => {
    let timestamp = dateReceived;
    let timestampFormatted = moment(timestamp).format("MMM Do [at] hh:ssa");
    return timestampFormatted;
  };

  return (
    <React.Fragment>
      <div style={{ overflow: "auto" }}>
        {/* <table className="messages_table">
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
        onClick={refreshList}
        startIcon={<AutorenewIcon />}
      >
        Refresh List
      </Button> */}
        <h3>Messages</h3>
        <List style={{ marginBottom: "5px", overflow: "hidden" }}>
          {messages.map(message => {
            return (
              <React.Fragment>
                <ListSubheader style={{ backgroundColor: "transparent" }}>
                  {formatDateFromDB(message.messageTimeStamp)}
                </ListSubheader>
                <ListItem
                  button
                  onClick={() => handleModal("open", message, "Messages")}
                >
                  <ListItemText
                    primary={message.messageSubject}
                    secondary={message.messageContent}
                  />
                </ListItem>
              </React.Fragment>
            );
          })}
        </List>
      </div>
    </React.Fragment>
  );
};

export default Messages;
