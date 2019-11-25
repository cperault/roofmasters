/******************************************************************************************************************\
 *File:    OpenJobs.js                                                                                             *
 *Author:  Christopher Perault                                                                                     *
 *Project: Roofmasters CMS (Customer Management System)                                                            *
 *Date:    October 26th, 2019                                                                                      *
 *Purpose: This component will show open jobs                                                                      *
\******************************************************************************************************************/

import React, { useState } from "react";
import axios from "axios";
import Button from "@material-ui/core/Button";

const OpenJobs = ({ loggedInUser }) => {
  const user = loggedInUser[0].userID;
  let jobsArray = [];
  const [openJobs, setOpenJobs] = useState([]);
  //get open jobs from DB and store in array
  const getOpenJobs = () => {
    axios
      .post(process.env.REACT_APP_ENDPOINT + "/get_open_jobs", {
        userID: user
      })
      .then(response => {
        setOpenJobs(response.data.open_jobs);
      });
  };
  //iterate through array and display list items to be displayed in div on return
  return (
    <div>
      <Button
        variant="contained"
        size="small"
        style={{ backgroundColor: "#64403e", color: "#c9cebd" }}
        onClick={getOpenJobs}
      >
        Load all open jobs
      </Button>
      <ul>
        {openJobs.map(job => {
          return <li className="open_job_li">{job.jobDescription}</li>;
        })}
      </ul>
    </div>
  );
};

export default OpenJobs;
