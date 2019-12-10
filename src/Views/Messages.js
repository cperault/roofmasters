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
  Fab,
  ListSubheader,
  ListItemText,
  ListItemAvatar,
  Divider
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import UserAvatar from "react-avatar";

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
    let timestampFormatted = moment(timestamp).format(
      "MMM Do YYYY [at] hh:ssa"
    );
    return timestampFormatted;
  };
  return (
    <React.Fragment>
      <h3>Messages</h3>
      <div
        style={{ overflowY: "scroll", height: "300px", paddingBottom: "10px" }}
      >
        <List
          style={{
            maxHeight: "100%",
            marginBottom: "5px",
            margin: "5px"
          }}
        >
          {messages.map(message => {
            return (
              <React.Fragment key={message.messageID}>
                <ListSubheader
                  disableSticky
                  style={{ backgroundColor: "transparent" }}
                >
                  {formatDateFromDB(message.messageTimeStamp)}
                </ListSubheader>
                <ListItem
                  button
                  onClick={() => handleModal("open", message, "Messages")}
                >
                  <ListItemAvatar>
                    <UserAvatar name={message.senderName} size="30" round />
                  </ListItemAvatar>
                  <ListItemText
                    primary={message.messageSubject}
                    secondary={
                      message.messageContent
                        .substring(0, message.messageContent.length / 2)
                        .trim() + "..."
                    }
                  />
                </ListItem>
                <Divider variant="inset" component="li" />
              </React.Fragment>
            );
          })}
        </List>
        {/* <Fab color="secondary" aria-label="add">
          <AddIcon />
        </Fab> */}
      </div>
    </React.Fragment>
  );
};

export default Messages;
