/******************************************************************************************************************\
 *File:    MessageDetails.js                                                                                       *
 *Author:  Christopher Perault                                                                                     *
 *Project: Roofmasters CMS (Customer Management System)                                                            *
 *Date:    December 7th, 2019                                                                                      *
 *Purpose: This component represents the view into which a selected message is expanded for details/actions        *
\******************************************************************************************************************/

import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import moment from "moment";

const MessageDetails = ({ panel }) => {
  //method to form message date/time
  const formatDateFromDB = dateReceived => {
    let timestamp = dateReceived;
    let timestampFormatted = moment(timestamp).format(
      "MM[/]DD[/]YYYY hh:ssa"
    );
    return timestampFormatted;
  };
  return (
    <div className="message_details_expanded_container">
      <div className="message_details_expanded_body">
        <Card raised style={{ padding: "10px", backgroundColor: "#C9BE99" }}>
          <CardContent>
            <TextField label="From" value={panel.senderName} fullWidth />
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
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MessageDetails;
