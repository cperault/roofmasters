/******************************************************************************************************************\
 *File:    NewJob.js                                                                                               *
 *Author:  Christopher Perault                                                                                     *
 *Project: Roofmasters CMS (Customer Management System)                                                            *
 *Date:    October 26th, 2019                                                                                      *
 *Purpose: This component will contain the form for creating a new job                                             *
\******************************************************************************************************************/

import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import FormLabel from "@material-ui/core/FormLabel";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormGroup from "@material-ui/core/FormGroup";
import Checkbox from "@material-ui/core/Checkbox";
import SaveIcon from "@material-ui/icons/Save";
import Check from "@material-ui/icons/Check";
import axios from "axios";
import { template } from "@babel/core";

const NewJob = ({ loggedInUser }) => {
  const today = new Date();
  const [buttonStatus, setButtonStatus] = useState("Save");
  const [buttonIcon, setButtonIcon] = useState(<SaveIcon />);
  const name = loggedInUser[0].firstName + " " + loggedInUser[0].lastName;
  const [jobDescription, setJobDescription] = useState("");
  const [jobType, setJobType] = useState([
    { name: "Roofing", checked: true },
    { name: "Gutters", checked: false },
    { name: "Siding", checked: false }
  ]);
  const submitJob = (description, jobType) => {
    //jobTitle will be a truncated version of the description based on half its length
    let length = description.length;
    let jobTitle = "";
    if (length > 40) {
      length = length / 2;
      jobTitle = description.substring(0, length).trim() + "...";
    } else {
      jobTitle = description.substring(0, length).trim();
    }

    //gather user data for request
    let userID = loggedInUser[0].userID;
    let checked = jobType.filter(type => type.checked); //returns object
    let jobTypeArray = [];
    for (let c of checked) {
      jobTypeArray.push(c["name"]);
    }
    console.log(jobTypeArray);
    //send request to backend to save job request
    axios
      .post(process.env.REACT_APP_ENDPOINT + "/save_job", {
        userID: userID,
        jobTitle: jobTitle,
        jobDescription: description,
        jobDateSubmitted: todayFull,
        jobType: jobTypeArray
      })
      .then(response => {
        alert(response.data);
        // if (response.data.validation === "Failed") {
        //   //something wrong; form failed validation
        //   let error = JSON.stringify(response.data);
        //   alert("Uh oh. \n" + JSON.parse(error));
        // } else if (response.data.job !== "Received") {
        //   let error = JSON.stringify(response.data.reasoning);
        //   alert("Sorry. " + JSON.parse(error));
        // } else {
        //   //success
        //   //update the form button text
        //   setButtonStatus("Submitted");
        //   //update the form button icon
        //   setButtonIcon(<Check />);
        // }
      });
  };
  const todayFull =
    today.getMonth() + 1 + "/" + today.getDate() + "/" + today.getFullYear();

  const handleChecked = () => {
    setJobType([...jobType]);
  };
  return (
    <div className="new_job_form">
      <TextField
        label="Name"
        value={name}
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
        value={jobDescription}
        onChange={text => setJobDescription(text.target.value)}
      />
      <FormGroup>
        <FormLabel component="legend">What is this job concerning?</FormLabel>
        {jobType.map(type => {
          return (
            <FormControlLabel
              control={
                <Checkbox
                  checked={type.checked}
                  onChange={handleChecked}
                  onClick={() => (type.checked = !type.checked)}
                  value={type.name}
                />
              }
              label={type.name}
            />
          );
        })}
      </FormGroup>
      <Button
        variant="contained"
        size="small"
        style={{ backgroundColor: "#64403e", color: "#c9cebd" }}
        startIcon={buttonIcon}
        onClick={() => submitJob(jobDescription, jobType)}
      >
        {buttonStatus}
      </Button>
    </div>
  );
};

export default NewJob;
