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

const Account = ({ accountCriteria, loggedInUser, handleModal }) => {
  const form = () => {
    //set up cases to check which component to load based on accountCriteria prop
    switch (accountCriteria) {
      case "settings":
        return <Settings handleModal={handleModal} />;
      case "messages":
        return (
          <Messages loggedInUser={loggedInUser} handleModal={handleModal} />
        );
      //   case "billing":
      //     return <Billing />;
      default:
        break;
    }
  };
  return <div className="account_expansion_details_div">{form()}</div>;
};

export default Account;
