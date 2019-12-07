/******************************************************************************************************************\
 *File:    OpenJobDetails.js                                                                                       *
 *Author:  Christopher Perault                                                                                     *
 *Project: Roofmasters CMS (Customer Management System)                                                            *
 *Date:    December 6th, 2019                                                                                      *
 *Purpose: This component represents the view into which a selected open job is expanded for details/actions       *
\******************************************************************************************************************/

import React from "react";

const OpenJobDetails = ({ panel }) => {
  const formatDateFromDB = dateReceived => {
    //convert from yyyy-mm-dd to mm-dd-yyyy
    let date = new Date(dateReceived);
    return (
      date.getMonth() + 1 + "/" + date.getDate() + "/" + date.getFullYear()
    );
  };
  return (
    <div>
      <div>
        <p>This is where the open job details are expanded.</p>
      </div>
    </div>
  );
};

export default OpenJobDetails;
