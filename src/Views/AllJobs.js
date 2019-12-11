/******************************************************************************************************************\
 *File:    AllJobs.js                                                                                             *
 *Author:  Christopher Perault                                                                                    *
 *Project: Roofmasters CMS (Customer Management System)                                                           *
 *Date:    December 10th, 2019                                                                                    *
 *Purpose: This component represents the view into which all jobs are displayed for admin role               *
\******************************************************************************************************************/

import React, { useState, useEffect } from "react";
import axios from "axios";
import Button from "@material-ui/core/Button";
import AutorenewIcon from "@material-ui/icons/Autorenew";

const AllJobs = ({ loggedInUser, handleModal }) => {
  //hook to store which jobs will be showed (open or completed, which will be updated on tab refreshes)
  const [jobs, setJobs] = useState([]);
  //hooks to manage state of button highlight to distinguish between user viewing open or completed jobs
  const [openColor, setOpenColor] = useState("#c9cebd");
  const [completedColor, setCompletedColor] = useState("#c9cebd");
  //hook to manage which type of message is being expanded
  const [jobType, setJobType] = useState("open");
  //function to refresh list manually
  const refreshList = (jobType = "") => {
    if (jobType === "/get_all_open_jobs") {
      setOpenColor("red");
      setCompletedColor("#c9cebd");
      setJobType("open");
    } else {
      setOpenColor("#c9cebd");
      setCompletedColor("red");
      setJobType("completed");
    }
    axios.get(process.env.REACT_APP_ENDPOINT + jobType).then(response => {
      setJobs([]);
      setJobs(response.data.all_jobs);
    });
  };
  //when the component is loaded, it will call the `getAlljobs()` method once; user can refresh if they want, manually
  useEffect(() => {
    //get open jobs from DB and store in array
    const getAllJobs = () => {
      axios
        .get(process.env.REACT_APP_ENDPOINT + "/get_all_open_jobs")
        .then(response => {
          setJobs([]);
          setJobs(response.data.all_jobs);
        });
    };

    getAllJobs();
  }, [loggedInUser]);

  const formatDateFromDB = dateReceived => {
    //convert from yyyy-mm-dd to mm-dd-yyyy
    let date = new Date(dateReceived);
    return (
      date.getMonth() + 1 + "/" + date.getDate() + "/" + date.getFullYear()
    );
  };

  //iterate through array and display list items to be displayed in div on return
  return (
    <React.Fragment>
      <div className="all_jobs_div" style={{ padding: "0" }}>
        <div className="message-inbox-tab-div">
          <Button
            variant="outlined"
            size="small"
            className="message-inbox-tab-btn-received"
            style={{
              width: "45%",
              backgroundColor: "#64403e",
              color: openColor,
              marginTop: "20px",
              marginRight: "5px"
            }}
            onClick={() => refreshList("/get_all_open_jobs")}
          >
            Open
          </Button>
          <Button
            variant="outlined"
            size="small"
            className="message-inbox-btn-sent"
            style={{
              width: "45%",
              backgroundColor: "#64403e",
              color: completedColor,
              marginTop: "20px",
              marginLeft: "5px"
            }}
            onClick={() => refreshList("/get_all_completed_jobs")}
          >
            Completed
          </Button>
        </div>
        <table className="all_jobs_table" style={{ padding: "20px" }}>
          <tbody>
            <tr>
              <th
                className="all_jobs_table_header"
                style={{
                  padding: "5px",
                  textAlign: "left",
                  width: jobType === "open" ? "25%" : "20%"
                }}
              >
                Job Description
              </th>
              <th
                className="all_jobs_table_header"
                style={{
                  padding: "5px",
                  textAlign: "left",
                  width: jobType === "open" ? "25%" : "20%"
                }}
              >
                Status
              </th>
              <th
                className="all_jobs_table_header"
                style={{
                  padding: "5px",
                  textAlign: "left",
                  width: jobType === "open" ? "25%" : "20%"
                }}
              >
                Created
              </th>
              {jobType === "completed" && (
                <th
                  className="all_jobs_table_header"
                  style={{
                    padding: "5px",
                    textAlign: "left",
                    width: jobType === "open" ? "25%" : "20%"
                  }}
                >
                  Completed
                </th>
              )}
              <th
                className="all_jobs_table_header"
                style={{
                  padding: "5px",
                  textAlign: "left",
                  width: jobType === "open" ? "25%" : "20%"
                }}
              >
                Job Type
              </th>
            </tr>
            {jobs.map(job => {
              return (
                <tr>
                  <td
                    key={job.jobID}
                    className="all_jobs_table_detail_description"
                    style={{
                      textAlign: "left",
                      padding: "5px",
                      width: jobType === "open" ? "35%" : "20%"
                    }}
                    onClick={() =>
                      handleModal("open", job, "All Jobs", jobType)
                    }
                  >
                    {job.jobDescription
                      .substring(0, job.jobDescription.length / 0.5)
                      .trim() + "..."}
                  </td>
                  <td
                    key={job.jobId}
                    className="all_jobs_table_detail_status"
                    style={{
                      textAlign: "left",
                      padding: "5px",
                      width: jobType === "open" ? "25%" : "20%"
                    }}
                  >
                    {job.jobStatus}
                  </td>
                  <td
                    key={job.jobID}
                    className="all_jobs_table_detail_date"
                    style={{
                      textAlign: "left",
                      padding: "5px",
                      width: jobType === "open" ? "25%" : "20%"
                    }}
                  >
                    {formatDateFromDB(job.jobDateSubmitted)}
                  </td>
                  {jobType === "completed" && (
                    <td
                      key={job.jobID}
                      className="all_jobs_table_detail_date"
                      style={{
                        textAlign: "left",
                        padding: "5px",
                        width: "10%"
                      }}
                    >
                      {formatDateFromDB(job.jobDateCompleted)}
                    </td>
                  )}
                  <td
                    key={job.jobID}
                    className="all_jobs_table_detail_type"
                    style={{
                      textAlign: "left",
                      padding: "5px",
                      width: jobType === "open" ? "25%" : "20%"
                    }}
                  >
                    {job.jobTitle}
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
    </React.Fragment>
  );
};

export default AllJobs;
