/******************************************************************************************************************\
 *File:    MessageDetails.js                                                                                       *
 *Author:  Christopher Perault                                                                                     *
 *Project: Roofmasters CMS (Customer Management System)                                                            *
 *Date:    December 7th, 2019                                                                                      *
 *Purpose: This component represents the view into which a selected message is expanded for details/actions        *
\******************************************************************************************************************/

import React, { useState } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import KeyboardReturnIcon from "@material-ui/icons/KeyboardReturn";
import SendIcon from "@material-ui/icons/Send";
import CancelScheduleSendIcon from "@material-ui/icons/CancelScheduleSend";
import CheckIcon from "@material-ui/icons/Check";
import moment from "moment";
import axios from "axios";

const MessageDetails = ({ loggedInUser, panel, messageType }) => {
  //method to form message date/time
  const formatDateFromDB = dateReceived => {
    let timestamp = dateReceived;
    let timestampFormatted = moment(timestamp).format("MM[/]DD[/]YYYY hh:ssa");
    return timestampFormatted;
  };
  //hook to manage state of reply area below messages
  const [showReply, setShowReply] = useState(false);
  //hooks to manage reply form message
  const [messageContent, setMessageContent] = useState("");
  //hook to manage button icon; default is the send arrow but then will be updated to checkmark icon on send
  const [sendIcon, setSendIcon] = useState(<SendIcon />);
  //hook to mange button text; default will be "send" but then be update to "Sent" on message send
  const [sendLabel, setSendLabel] = useState("Send");
  //event for when user clicks reply button
  const handleClickReply = () => {
    //expand reply area below message
    setShowReply(true);
  };
  //event handler for when user cancels the reply message
  const handleClickCancelSend = () => {
    //hide reply area
    setShowReply(false);
  };
  //method for when user clicks send button
  const sendReply = (content, subject) => {
    //send axios request to backend
    axios
      .post(process.env.REACT_APP_ENDPOINT + "/send_message", {
        recipientID: panel.senderID,
        senderID: panel.recipientID,
        senderFirstName: loggedInUser[0].firstName,
        senderLastName: loggedInUser[0].lastName,
        messageSubject: subject,
        messageContent: content
      })
      .then(response => {
        //hide the reply area and change icon of reply to checkmark and sent icon
        setShowReply(false);
        setSendIcon(<CheckIcon />);
        setSendLabel("Sent");
      });
  };
  return (
    <div className="message_details_expanded_container">
      <div className="message_details_expanded_body">
        <Card raised style={{ padding: "10px", backgroundColor: "#C9BE99" }}>
          <CardContent>
            <TextField
              label="From"
              value={panel.senderFirstName + " " + panel.senderLastName}
              fullWidth
            />
            <TextField
              label="Sent"
              value={formatDateFromDB(panel.messageTimeStamp)}
              fullWidth
            />
            <TextField label="Subject" value={panel.messageSubject} fullWidth />
            <br />
            <TextField
              id="message_description"
              label="Message"
              multiline
              rows="4"
              rowsMax="10"
              margin="normal"
              variant="outlined"
              fullWidth
              value={panel.messageContent}
            />
            {messageType === "received" && (
              <Button
                style={{
                  float: "right",
                  backgroundColor: "#64403e",
                  color: "white"
                }}
                startIcon={<KeyboardReturnIcon />}
                onClick={handleClickReply}
              >
                Reply
              </Button>
            )}
            {showReply && (
              <CardContent>
                <TextField
                  label="To"
                  value={panel.senderFirstName + " " + panel.senderLastName}
                  fullWidth
                />
                <TextField
                  id="message_reply_subject"
                  label="Subject"
                  value={"Re:" + panel.messageSubject}
                  fullWidth
                  InputProps={{ readOnly: "true" }}
                />
                <br />
                <TextField
                  id="message_reply_content"
                  label="Reply"
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
                  onClick={() =>
                    sendReply(messageContent, "Re:" + panel.messageSubject)
                  }
                >
                  {sendLabel}
                </Button>
                <Button
                  style={{
                    float: "right",
                    backgroundColor: "#64403e",
                    color: "white",
                    margin: "2px"
                  }}
                  startIcon={<CancelScheduleSendIcon />}
                  onClick={handleClickCancelSend}
                >
                  Cancel
                </Button>
              </CardContent>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MessageDetails;
