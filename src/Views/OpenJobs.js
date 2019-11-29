/******************************************************************************************************************\
 *File:    OpenJobs.js                                                                                             *
 *Author:  Christopher Perault                                                                                     *
 *Project: Roofmasters CMS (Customer Management System)                                                            *
 *Date:    November 26th, 2019                                                                                      *
 *Purpose: This component will show open jobs                                                                      *
\******************************************************************************************************************/

import React, { useState, useEffect } from "react";
import axios from "axios";
import Button from "@material-ui/core/Button";
import AutorenewIcon from "@material-ui/icons/Autorenew";

const OpenJobs = ({ loggedInUser, formatDateFromDB }) => {
  const user = loggedInUser[0].userID;
  const [openJobs, setOpenJobs] = useState([]);
  const [jobsLoaded, setJobsLoaded] = useState(false);

  //get open jobs from DB and store in array
  const getOpenJobs = () => {
    axios
      .post(process.env.REACT_APP_ENDPOINT + "/get_open_jobs", {
        userID: user
      })
      .then(response => {
        setOpenJobs(response.data.open_jobs);
        setJobsLoaded(true);
      });
  };

  //when the component is loaded, it will call the `getOpenJobs()` method once; user can refresh if they want, manually
  useEffect(() => {
    getOpenJobs();
  }, [jobsLoaded]);

  //iterate through array and display list items to be displayed in div on return
  return (
    <div className="open_jobs_div">
      <table className="open_jobs_table">
        <tbody>
          <tr>
            <th className="open_jobs_table_header">Job Type</th>
            <th className="open_jobs_table_header">Details</th>
            <th className="open_jobs_table_header">Created</th>
          </tr>
          {openJobs.map(job => {
            return (
              <tr key={job.jobID}>
                <td className="open_jobs_table_detail_title">{job.jobTitle}</td>
                <td className="open_jobs_table_detail_description">
                  <a href={job.jobID}>
                    {job.jobDescription
                      .substring(0, job.jobDescription.length / 2)
                      .trim() + "..."}
                  </a>
                </td>
                <td className="open_jobs_table_detail_date">
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
        onClick={getOpenJobs}
        startIcon={<AutorenewIcon />}
      >
        Refresh List
      </Button>
    </div>
  );
};

export default OpenJobs;
