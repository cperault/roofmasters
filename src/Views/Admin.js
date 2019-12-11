/******************************************************************************************************************\
 *File:    Admin.js                                                                                                *
 *Author:  Christopher Perault                                                                                     *
 *Project: Roofmasters CMS (Customer Management System)                                                            *
 *Date:    November 26th, 2019                                                                                     *
 *Purpose: This component will show admin stuff on the profile                                                     *
\******************************************************************************************************************/
import React from "react";
import AllJobs from "./AllJobs.js";
import AllCustomers from "./AllCustomers.js";
import Messages from "./Messages.js";

const Admin = ({ accountCriteria, loggedInUser, handleModal }) => {
  const form = () => {
    //set up cases to check which component to load based on accountCriteria prop
    switch (accountCriteria) {
      case "All Jobs":
        return (
          <AllJobs loggedInUser={loggedInUser} handleModal={handleModal} />
        );
      case "All Customers":
        return (
          <AllCustomers loggedInUser={loggedInUser} handleModal={handleModal} />
        );
      //   case "billing":
      //     return <Billing />;
      case "messages":
        return (
          <Messages loggedInUser={loggedInUser} handleModal={handleModal} />
        );
      default:
        break;
    }
  };
  return <div className="admin_expansion_details_div">{form()}</div>;
};

export default Admin;
