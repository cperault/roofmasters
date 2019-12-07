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
    let timestampFormatted = moment(timestamp).format("MMM Do [at] hh:ssa");
    return timestampFormatted;
  };
  return (
    <div className="message_details_expanded_container">
      <div className="message_details_expanded_body">
        <Card raised style={{ backgroundColor: "#C9BE99", padding: "10px" }}>
          <CardContent>
            <TextField
              label="From"
              InputProps={{ readOnly: true }}
              fullWidth
              value={panel.senderName}
            />
            <TextField
              label="Date of message"
              fullWidth
              value={formatDateFromDB(panel.messageTimeStamp)}
            />
            <TextField
              label="They said"
              multiline
              rows="4"
              rowsMax="10"
              margin="normal"
              variant="outlined"
              fullWidth
              value={panel.messageContent}
            />
            <Button
              variant="contained"
              startIcon={<EditIcon />}
              size="small"
              style={{
                backgroundColor: "#64403e",
                color: "#c9cebd",
                float: "right",
                margin: "2px"
              }}
            >
              Edit
            </Button>
            <Button
              variant="contained"
              startIcon={<DeleteIcon />}
              size="small"
              style={{
                backgroundColor: "#64403e",
                color: "#c9cebd",
                float: "right",
                margin: "2px"
              }}
            >
              Delete
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MessageDetails;
