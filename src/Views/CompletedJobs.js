/******************************************************************************************************************\
 *File:    CompletedJobs.js                                                                                        *
 *Author:  Christopher Perault                                                                                     *
 *Project: Roofmasters CMS (Customer Management System)                                                            *
 *Date:    November 26th, 2019                                                                                      *
 *Purpose: This component will show completed jobs                                                                 *
\******************************************************************************************************************/

import React, { useState } from "react";
import axios from "axios";
import Button from "@material-ui/core/Button";

const CompletedJobs = ({ loggedInUser }) => {
  const user = loggedInUser[0].userID;
  const [completedJobs, setCompletedJobs] = useState([]);
  //get completed jobs from DB and store in array
  const getCompletedJobs = () => {
    axios
      .post(process.env.REACT_APP_ENDPOINT + "/get_completed_jobs", {
        userID: user
      })
      .then(response => {
        setCompletedJobs(response.data.completed_jobs);
      });
  };
  //iterate through array and display list items to be displayed in div on return
  return (
    <div>
      <Button
        variant="contained"
        size="small"
        style={{ backgroundColor: "#64403e", color: "#c9cebd" }}
        onClick={getCompletedJobs}
      >
        Load all completed jobs
      </Button>
      <ul>
        {completedJobs.map(job => {
          return <li className="completed_job_li">{job.jobDescription}</li>;
        })}
      </ul>
    </div>
  );
};

export default CompletedJobs;
