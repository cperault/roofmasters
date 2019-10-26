/******************************************************************************************************************\
 *File:    NewJob.js                                                                                               *
 *Author:  Christopher Perault                                                                                     *
 *Project: Roofmasters CMS (Customer Management System)                                                            *
 *Date:    October 26th, 2019                                                                                      *
 *Purpose: This component will contain the form for creating a new job                                             *
\******************************************************************************************************************/

import React from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import SaveIcon from "@material-ui/icons/Save";

const NewJob = ({ loggedInUser }) => {
  const today = new Date();
  const todayFull =
    today.getMonth() + 1 + "/" + today.getDate() + "/" + today.getFullYear();
  return (
    <div className="new_job_form">
      <TextField
        label="Name"
        value={loggedInUser[0].firstName + " " + loggedInUser[0].lastName}
        InputProps={{ readOnly: true }}
        fullWidth
      />
      <TextField label="Date of Request" value={todayFull} fullWidth />
      <TextField
        label="Description"
        multiline
        rows="4"
        rowsMax="10"
        margin="normal"
        variant="outlined"
        placeholder="What do you need done?"
        fullWidth
      />
      <Button
        variant="contained"
        color="primary"
        size="small"
        startIcon={<SaveIcon />}
      >
        Submit
      </Button>
    </div>
  );
};

export default NewJob;
