/******************************************************************************************************************\
 *File:    OpenJobs.js                                                                                             *
 *Author:  Christopher Perault                                                                                     *
 *Project: Roofmasters CMS (Customer Management System)                                                            *
 *Date:    November 26th, 2019                                                                                      *
 *Purpose: This component will show open jobs                                                                      *
\******************************************************************************************************************/

import React, { useState } from "react";
import axios from "axios";
import Button from "@material-ui/core/Button";

const OpenJobs = ({ loggedInUser }) => {
  const user = loggedInUser[0].userID;
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
    <div className="open_jobs_div">
      <div>
        <ul>
          {openJobs.map(job => {
            return (
              <li key={job.jobID} className="open_job_li">
                {job.jobDescription}
              </li>
            );
          })}
        </ul>
        <Button
          variant="contained"
          size="small"
          style={{ backgroundColor: "#64403e", color: "#c9cebd" }}
          onClick={getOpenJobs}
        >
          Load all open jobs
        </Button>
      </div>
    </div>
  );
};

export default OpenJobs;
