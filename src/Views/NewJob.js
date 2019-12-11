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
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import axios from "axios";

const NewJob = ({ loggedInUser }) => {
  //extract the address array from the loggedInUser object
  let addressArray = loggedInUser[0].userAddress;
  //instantiate new date object to store today's date
  const today = new Date();
  //get today's date and store in variable to display in new job form
  const todayFull =
    today.getMonth() + 1 + "/" + today.getDate() + "/" + today.getFullYear();
  //hooks to maintain appearance of the button on the new job creation form
  const [buttonStatus, setButtonStatus] = useState("Save");
  const [buttonIcon, setButtonIcon] = useState(<SaveIcon />);
  //piece together full name from the loggedInUser object
  const name = loggedInUser[0].firstName + " " + loggedInUser[0].lastName;
  //hook to store the description of the job needing done by the user
  const [jobDescription, setJobDescription] = useState("");
  //hook to store any errors received from backend following the axios request
  const [errors, setErrors] = useState([]);
  //an initial hook storing the values of the checkboxes with the default being `Roofing` pre-checked
  const initialJobTypes = [
    { id: 1, name: "Roofing", checked: true },
    { id: 2, name: "Gutters", checked: false },
    { id: 3, name: "Siding", checked: false }
  ];
  //hook to store which jobs are selected; gets updated within the `handleChecked()` event handler
  const [jobType, setJobType] = useState(initialJobTypes);
  //hook to store which address is confirmed for the job request; gets updated within the `handleSelect()` event handler
  const [jobAddress, setJobAddress] = useState("");
  //hook to store address ID of address confirmed
  const [addressID, setAddressID] = useState();
  //function to collect data from the form and send to the backend for DB saving
  const submitJob = (description, jobType, addressSelected) => {
    //gather user data for request
    let userID = loggedInUser[0].userID;
    let checked = jobType.filter(type => type.checked); //returns object
    let jobTypeArray = [];
    for (var c of checked) {
      jobTypeArray.push(c["name"]);
    }

    //send request to backend to save job request
    axios
      .post(process.env.REACT_APP_ENDPOINT + "/save_job", {
        userID: userID,
        jobDescription: description,
        jobDateSubmitted: todayFull,
        jobType: jobTypeArray,
        addressSelected: addressSelected,
        addressID: addressID
      })
      .then(response => {
        if (response.data.validation === "Failed") {
          //something wrong; form failed validation
          let error = JSON.stringify(response.data.reasoning);
          setErrors(JSON.parse(error));
        } else {
          //success; clear the form
          setJobAddress("");
          setErrors([]);
          setJobDescription("");
          setJobType(initialJobTypes);
          //update the form button text
          setButtonStatus("Submitted");
          //update the form button icon
          setButtonIcon(<Check />);
        }
      });
  };

  //event handler for the checkboxes
  const handleChecked = () => {
    setJobType([...jobType]);
  };
  //event handler for the select menu
  const handleSelect = event => {
    //store selected address for job
    setJobAddress(event.target.value);
    //get selected index of event target sent
    let selectedIndex = event.target.options.selectedIndex;
    //get value of the data-key attribute and store in addressID hook
    let id = event.target.options[selectedIndex].getAttribute("data-key");
    setAddressID(id);
  };

  return (
    <div className="new_job_form">
      <TextField
        label="Name"
        value={name}
        readOnly
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
      <FormControl
        fullWidth
        style={{ marginTop: "10px", marginBottom: "30px" }}
      >
        <InputLabel htmlFor="age-native-simple">Confirm address</InputLabel>
        <Select
          native
          value={jobAddress}
          key={addressID}
          onChange={handleSelect}
          inputProps={{
            id: "age-native-simple"
          }}
        >
          <option value=""></option>
          {addressArray.map(address => {
            return (
              <option
                key={address["userAddress"].addressID}
                data-key={address["userAddress"].addressID}
                value={address["userAddress"].addressName}
              >
                {address["userAddress"].addressName}
              </option>
            );
          })}
        </Select>
      </FormControl>
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
                  key={type.id}
                />
              }
              label={type.name}
              key={type.id}
            />
          );
        })}
      </FormGroup>
      <Button
        variant="contained"
        size="small"
        style={{ backgroundColor: "#64403e", color: "#c9cebd" }}
        startIcon={buttonIcon}
        onClick={() => submitJob(jobDescription, jobType, jobAddress)}
      >
        {buttonStatus}
      </Button>
      {errors.length > 0 ? (
        <div className="new-job-form-error-div">
          <h2>Please correct the following:</h2>
          <ul>
            {errors.map(e => {
              return <li>-{e}</li>;
            })}
          </ul>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default NewJob;
