/******************************************************************************************************************\
 *File:    NewMessage.js                                                                                           *
 *Author:  Christopher Perault                                                                                     *
 *Project: Roofmasters CMS (Customer Management System)                                                            *
 *Date:    December 9th, 2019                                                                                      *
 *Purpose: This component represents the view into which a new message is expanded for composition                 *
\******************************************************************************************************************/

import React, { useState } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import SendIcon from "@material-ui/icons/Send";
import CheckIcon from "@material-ui/icons/Check";
import axios from "axios";

const NewMessage = ({ panel }) => {
  //hooks to manage state of new message
  const [messageSubject, setMessageSubject] = useState("");
  const [messageContent, setMessageContent] = useState("");
  //hook to manage button icon; default is the send arrow but then will be updated to checkmark icon on send
  const [sendIcon, setSendIcon] = useState(<SendIcon />);
  //hook to mange button text; default will be "send" but then be update to "Sent" on message send
  const [sendLabel, setSendLabel] = useState("Send");
  //method to send the new message
  const handleMessageSend = (subject, content) => {
    //send message to backend
    axios
      .post(process.env.REACT_APP_ENDPOINT + "/send_new_message", {
        userID: panel[0].userID,
        senderFirstName: panel[0].firstName,
        senderLastName: panel[0].lastName,
        senderEmailAddress: panel[0].senderEmail,
        messageSubject: subject,
        messageContent: content
      })
      .then(response => {
        //take user back
        setSendIcon(<CheckIcon />);
        setSendLabel("Sent");
      });
  };
  return (
    <div className="new_message_container">
      <div className="new_messsage_body">
        <Card raised style={{ padding: "10px", backgroundColor: "#C9BE99" }}>
          <CardContent>
            <TextField
              label="To"
              value="Emily Morris (Roofmasters)"
              fullWidth
              InputProps={{ readOnly: "true" }}
            />
            <TextField
              label="From"
              value={panel[0].firstName + " " + panel[0].lastName}
              fullWidth
              InputProps={{ readOnly: "true" }}
            />
            <TextField
              id="message_subject"
              label="Subject"
              value={messageSubject}
              fullWidth
              onChange={text => setMessageSubject(text.target.value)}
            />
            <br />
            <TextField
              id="message_content"
              label="Message"
              multiline
              rows="4"
              rowsMax="10"
              margin="normal"
              variant="outlined"
              fullWidth
              value={messageContent}
              onChange={text => setMessageContent(text.target.value)}
            />
            <Button
              style={{
                float: "right",
                backgroundColor: "#64403e",
                color: "white",
                margin: "2px"
              }}
              startIcon={sendIcon}
              onClick={() => handleMessageSend(messageSubject, messageContent)}
            >
              {sendLabel}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default NewMessage;
