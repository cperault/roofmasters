/******************************************************************************************************************\
 *File:    CompletedJobs.js                                                                                        *
 *Author:  Christopher Perault                                                                                     *
 *Project: Roofmasters CMS (Customer Management System)                                                            *
 *Date:    November 26th, 2019                                                                                      *
 *Purpose: This component will show completed jobs                                                                 *
\******************************************************************************************************************/

import React, { useState, useEffect } from "react";
import axios from "axios";
import Button from "@material-ui/core/Button";
import AutorenewIcon from "@material-ui/icons/Autorenew";

const CompletedJobs = ({ loggedInUser, formatDateFromDB, handleModal }) => {
  const user = loggedInUser[0].userID;
  const [completedJobs, setCompletedJobs] = useState([]);
  const [jobsLoaded, setJobsLoaded] = useState(false);

  //get completed jobs from DB and store in array
  const getCompletedJobs = () => {
    axios
      .post(process.env.REACT_APP_ENDPOINT + "/get_completed_jobs", {
        userID: user
      })
      .then(response => {
        setCompletedJobs(response.data.completed_jobs);
        setJobsLoaded(true);
      });
  };

  //when the component is loaded, it will call the `getCompletedJobs()` method once; user can refresh if they want, manually
  useEffect(() => {
    getCompletedJobs();
  }, [jobsLoaded]);

  //iterate through array and display list items to be displayed in div on return
  return (
    <div className="completed_jobs_div">
      <table className="completed_jobs_table">
        <tbody>
          <tr>
            <th className="completed_jobs_table_header">Job Type</th>
            <th className="completed_jobs_table_header">Details</th>
            <th className="completed_jobs_table_header">Created</th>
          </tr>
          {completedJobs.map(job => {
            return (
              <tr key={job.jobID}>
                <td className="completed_jobs_table_detail_title">
                  {job.jobTitle}
                </td>
                <td className="completed_jobs_table_detail_description">
                  <span
                    key={job.jobID}
                    style={{ textDecoration: "underline" }}
                    onClick={() => handleModal("open", job, "Completed Jobs")}
                  >
                    {job.jobDescription
                      .substring(0, job.jobDescription.length / 2)
                      .trim() + "..."}
                  </span>
                </td>
                <td className="completed_jobs_table_detail_date">
                  {formatDateFromDB(job.jobDateSubmitted)}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <Button
        variant="contained"
        size="small"
        style={{ backgroundColor: "#64403e", color: "#c9cebd" }}
        onClick={getCompletedJobs}
        startIcon={<AutorenewIcon />}
      >
        Refresh List
      </Button>
    </div>
  );
};

export default CompletedJobs;
