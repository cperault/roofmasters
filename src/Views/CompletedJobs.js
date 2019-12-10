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
  const [completedJobs, setCompletedJobs] = useState([]);

  //function to refresh list manually
  const refreshList = () => {
    const user = loggedInUser[0].userID;
    axios
      .post(process.env.REACT_APP_ENDPOINT + "/get_completed_jobs", {
        userID: user
      })
      .then(response => {
        setCompletedJobs(response.data.completed_jobs);
      });
  };

  //when the component is loaded, it will call the `getCompletedJobs()` method once; user can refresh if they want, manually
  useEffect(() => {
    const user = loggedInUser[0].userID;
    //get completed jobs from DB and store in array
    const loadAllCompletedJobs = () => {
      axios
        .post(process.env.REACT_APP_ENDPOINT + "/get_completed_jobs", {
          userID: user
        })
        .then(response => {
          setCompletedJobs(response.data.completed_jobs);
        });
    };
    loadAllCompletedJobs();
  }, [loggedInUser]);

  //iterate through array and display list items to be displayed in div on return
  return (
    <div className="completed_jobs_div">
      <table className="completed_jobs_table">
        <tbody>
          <tr>
            <th className="completed_jobs_table_header">Details</th>
            <th className="completed_jobs_table_header">Created</th>
            <th className="completed_jobs_table_header">Completed</th>
          </tr>
          {completedJobs.map(job => {
            return (
              <tr key={job.jobID}>
                <td className="completed_jobs_table_detail_description">
                  <span
                    key={job.jobID}
                    className="completed_jobs_table_detail_description_item"
                    onClick={() => handleModal("open", job, "Completed Jobs")}
                  >
                    {job.jobDescription
                      .substring(0, job.jobDescription.length / 0.5)
                      .trim() + "..."}
                  </span>
                </td>
                <td className="completed_jobs_table_detail_date">
                  {formatDateFromDB(job.jobDateSubmitted)}
                </td>
                <td className="completed_jobs_table_detail_date">
                  {formatDateFromDB(job.jobDateCompleted)}
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
        onClick={refreshList}
        startIcon={<AutorenewIcon />}
      >
        Refresh List
      </Button>
    </div>
  );
};

export default CompletedJobs;
