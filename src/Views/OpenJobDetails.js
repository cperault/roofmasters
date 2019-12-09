/******************************************************************************************************************\
 *File:    OpenJobDetails.js                                                                                       *
 *Author:  Christopher Perault                                                                                     *
 *Project: Roofmasters CMS (Customer Management System)                                                            *
 *Date:    December 6th, 2019                                                                                      *
 *Purpose: This component represents the view into which a selected open job is expanded for details/actions       *
\******************************************************************************************************************/

import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

const OpenJobDetails = ({ panel }) => {
  const formatDateFromDB = dateReceived => {
    //convert from yyyy-mm-dd to mm-dd-yyyy
    let date = new Date(dateReceived);
    return (
      date.getMonth() + 1 + "/" + date.getDate() + "/" + date.getFullYear()
    );
  };
  const handleEditButtonClick = text => {
    //handle user wanting to edit form
  };
  const handleDeleteButtonClick = () => {
    //handle the user deleting their job request
  };
  return (
    <div className="open_job_details_expanded_container">
      <div className="open_job_details_expanded_body">
        <Card raised style={{ padding: "10px", backgroundColor: "#C9BE99" }}>
          <CardContent>
            <TextField label="Criteria" value={panel.jobTitle} fullWidth />
            <TextField
              label="Date job was submitted"
              value={formatDateFromDB(panel.jobDateSubmitted)}
              fullWidth
            />
            <TextField
              id="job_description"
              label="Job request description"
              multiline
              rows="4"
              rowsMax="10"
              margin="normal"
              variant="outlined"
              fullWidth
              value={panel.jobDescription}
              onChange={text => handleEditButtonClick(text.target.value)}
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
              onClick={handleEditButtonClick}
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
              onClick={handleDeleteButtonClick}
            >
              Delete
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default OpenJobDetails;
