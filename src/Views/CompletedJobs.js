/******************************************************************************************************************\
 *File:    CompletedJobs.js                                                                                        *
 *Author:  Christopher Perault                                                                                     *
 *Project: Roofmasters CMS (Customer Management System)                                                            *
 *Date:    October 26th, 2019                                                                                      *
 *Purpose: This component will show completed jobs                                                                 *
\******************************************************************************************************************/

import React from "react";

const CompletedJobs = () => {
  //get completed jobs from DB and store in array
  //iterate through array and display list items to be displayed in div on return
  return (
    <div>
      <p>This is completed job #1</p>
      <p>This is completed job #2</p>
      <p>This is completed job #3</p>
    </div>
  );
};

export default CompletedJobs;
