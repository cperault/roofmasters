/******************************************************************************************************************\
 *File:    CompletedJobDetails.js                                                                                  *
 *Author:  Christopher Perault                                                                                     *
 *Project: Roofmasters CMS (Customer Management System)                                                            *
 *Date:    December 6th, 2019                                                                                      *
 *Purpose: This component represents the view into which a selected completed job is expanded for details/actions  *
\******************************************************************************************************************/

import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import TextField from "@material-ui/core/TextField";
const CompletedJobDetails = ({ panel }) => {
  const formatDateFromDB = dateReceived => {
    //convert from yyyy-mm-dd to mm-dd-yyyy
    let date = new Date(dateReceived);
    return (
      date.getMonth() + 1 + "/" + date.getDate() + "/" + date.getFullYear()
    );
  };
  return (
    <div className="completed_job_details_expanded_container">
      <div className="completed_job_details_expanded_body">
        <Card raised style={{ padding: "10px", backgroundColor: "#C9BE99" }}>
          <CardContent>
            <TextField label="Job type" value={panel.jobTitle} fullWidth />
            <TextField
              label="Date job was submitted"
              value={formatDateFromDB(panel.jobDateSubmitted)}
              fullWidth
            />
            <br />
            <TextField
              label="Date job was completed"
              value={formatDateFromDB(panel.jobDateCompleted)}
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
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CompletedJobDetails;
