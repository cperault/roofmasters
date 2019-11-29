/******************************************************************************************************************\
 *File:    Jobs.js                                                                                                 *
 *Author:  Christopher Perault                                                                                     *
 *Project: Roofmasters CMS (Customer Management System)                                                            *
 *Date:    October 26th, 2019                                                                                      *
 *Purpose: This component will handle which job component to display: new, open, or completed                      *
\******************************************************************************************************************/

import React from "react";
import NewJob from "./NewJob.js";
import OpenJobs from "./OpenJobs.js";
import CompletedJobs from "./CompletedJobs.js";

const Jobs = ({ jobType, loggedInUser }) => {
  const formatDateFromDB = dateReceived => {
    //convert from yyyy-mm-dd to mm-dd-yyyy
    let date = new Date(dateReceived);
    return (
      date.getMonth() + 1 + "/" + date.getDate() + "/" + date.getFullYear()
    );
  };
  const form = () => {
    //set up cases for job types
    switch (jobType) {
      case "new":
        return <NewJob loggedInUser={loggedInUser} />;
      case "open":
        return (
          <OpenJobs
            loggedInUser={loggedInUser}
            formatDateFromDB={formatDateFromDB}
          />
        );
      case "completed":
        return (
          <CompletedJobs
            loggedInUser={loggedInUser}
            formatDateFromDB={formatDateFromDB}
          />
        );
      default:
        break;
    }
  };
  return <div>{form()}</div>;
};

export default Jobs;
