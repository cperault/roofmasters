/******************************************************************************************************************\
 *File:    Jobs.js                                                                                                 *
 *Author:  Christopher Perault                                                                                     *
 *Project: Roofmasters CMS (Customer Management System)                                                            *
 *Date:    October 2nd, 2019                                                                                       *
 *Purpose: This is the view where jobs will appear. The user will be able to view open and completed jobs,         *
 *         but also be able to create new jobs.                                                                    *
\******************************************************************************************************************/

import React from "react";

const Jobs = ({ Nav }, jobType = "") => {
  return (
    <div>
      <nav>
        <Nav />
      </nav>
    </div>
  );
};

export default Jobs;
