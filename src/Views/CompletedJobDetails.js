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
    <div>
      <Card raised style={{ backgroundColor: "#C9BE99" }}>
        <CardContent>
          <TextField
            label="Criteria"
            value={panel.jobTitle}
            InputProps={{ readOnly: true }}
            variant="outlined"
          />
          <br />
          <br />
          <TextField
            label="Submitted"
            value={formatDateFromDB(panel.jobDateSubmitted)}
            InputProps={{ readOnly: true }}
            style={{ width: "150px", marginRight: "5px" }}
            variant="outlined"
          />
          <TextField
            label="Completed"
            value={formatDateFromDB(panel.jobDateCompleted)}
            InputProps={{ readOnly: true }}
            style={{ width: "150px", marginLeft: "5px" }}
            variant="outlined"
          />
          <TextField
            label="Job request description"
            multiline
            rows="4"
            rowsMax="10"
            margin="normal"
            variant="outlined"
            fullWidth
            InputProps={{ readOnly: true }}
            value={panel.jobDescription}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default CompletedJobDetails;
