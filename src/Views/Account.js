/******************************************************************************************************************\
 *File:    Account.js                                                                                              *
 *Author:  Christopher Perault                                                                                     *
 *Project: Roofmasters CMS (Customer Management System)                                                            *
 *Date:    October 26th, 2019                                                                                      *
 *Purpose: This component will handle which part of the account to display: settings,                              *
 *         messages, or billing (customer, admin)                                                                  *
\******************************************************************************************************************/
import React from "react";
import Settings from "./Settings.js";
import Messages from "./Messages.js";

const Account = ({ accountCriteria, loggedInUser }) => {
  const form = () => {
    //set up cases to check which component to load based on accountCriteria prop
    switch (accountCriteria) {
      case "settings":
        return <Settings />;
      case "messages":
        return <Messages loggedInUser={loggedInUser}/>;
      //   case "billing":
      //     return <Billing />;
    }
  };
  return <div>{form()}</div>;
};

export default Account;
