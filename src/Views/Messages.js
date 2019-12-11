/******************************************************************************************************************\
 *File:    Messages.js                                                                                             *
 *Author:  Christopher Perault                                                                                     *
 *Project: Roofmasters CMS (Customer Management System)                                                            *
 *Date:    October 26th, 2019                                                                                      *
 *Purpose: This component will be where all messages are displayed and handled                                     *
\******************************************************************************************************************/

import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import UserAvatar from "react-avatar";
import {
  List,
  ListItem,
  ListSubheader,
  ListItemText,
  ListItemAvatar,
  Divider,
  Button
} from "@material-ui/core";
import CreateIcon from "@material-ui/icons/Create";

const Messages = ({ loggedInUser, handleModal }) => {
  //hook to store which messages will be showed (received or sent, which will be filled by the above hooks)
  const [messages, setMessages] = useState([]);
  //hooks to manage state of button highlight to distinguish between user viewing received or sent messages
  const [receivedColor, setReceivedColor] = useState("#c9cebd");
  const [sentColor, setSentColor] = useState("#c9cebd");
  //hook to manage which type of message is being expanded
  const [messageType, setMessageType] = useState("received");
  //function to refresh list manually
  const refreshList = (messageType = "") => {
    if (messageType === "/get_received_messages") {
      setReceivedColor("red");
      setSentColor("#c9cebd");
      setMessageType("received");
    } else {
      setReceivedColor("#c9cebd");
      setSentColor("red");
      setMessageType("sent");
    }
    const userID = loggedInUser[0].userID;
    //set up the axios request to fetch all messages for associatedID (loggedInUsers ID)
    axios
      .post(process.env.REACT_APP_ENDPOINT + messageType, {
        userID: userID
      })
      .then(response => {
        setMessages(response.data.all_messages);
      });
  };

  //when the component is loaded, it will call the `getReceivedMessages()` and `getSentMessages()` methods once (and only once thanks to useEffect)
  useEffect(() => {
    const userID = loggedInUser[0].userID;

    const getReceivedMessages = () => {
      //get all messages sent to user from the DB and store in array
      axios
        .post(process.env.REACT_APP_ENDPOINT + "/get_received_messages", {
          userID: userID
        })
        .then(response => {
          setMessages(response.data.all_messages);
        });
    };
    getReceivedMessages();
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
      <div className="message-inbox-tab-div">
        <Button
          variant="outlined"
          size="small"
          className="message-inbox-tab-btn-received"
          style={{
            width: "45%",
            backgroundColor: "#64403e",
            color: receivedColor,
            marginTop: "20px",
            marginRight: "5px"
          }}
          onClick={() => refreshList("/get_received_messages")}
        >
          Received
        </Button>
        <Button
          variant="outlined"
          size="small"
          className="message-inbox-btn-sent"
          style={{
            width: "45%",
            backgroundColor: "#64403e",
            color: sentColor,
            marginTop: "20px",
            marginLeft: "5px"
          }}
          onClick={() => refreshList("/get_sent_messages")}
        >
          Sent
        </Button>
      </div>
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
                  onClick={() =>
                    handleModal("open", message, "Messages", messageType)
                  }
                >
                  <ListItemAvatar>
                    <UserAvatar
                      name={
                        message.senderFirstName + " " + message.senderLastName
                      }
                      size="30"
                      round
                    />
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
                <Divider variant="inset" />
              </React.Fragment>
            );
          })}
        </List>
      </div>
      <Button
        style={{
          display: "inline-block",
          backgroundColor: "#64403e",
          marginRight: "10px",
          marginTop: "10px",
          marginBottom: "10px",
          color: "white"
        }}
        startIcon={<CreateIcon />}
        onClick={() => handleModal("open", loggedInUser, "New Message", "Sent")}
      >
        Compose
      </Button>
    </React.Fragment>
  );
};

export default Messages;
