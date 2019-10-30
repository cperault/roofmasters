/******************************************************************************************************************\
 *File:    Profile.js                                                                                              *
 *Author:  Christopher Perault                                                                                     *
 *Project: Roofmasters CMS (Customer Management System)                                                            *
 *Date:    August 8th, 2019                                                                                        *
 *Purpose: This is the profile page view.                                                                          *
\******************************************************************************************************************/

import React from "react";
import { Card } from "@material-ui/core";
import { ExpansionPanel } from "@material-ui/core";
import { ExpansionPanelSummary } from "@material-ui/core";
import { ExpansionPanelDetails } from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Jobs from "./Jobs.js";
import Account from "./Account.js";

const Profile = ({ userIsLoggedIn, loggedInUser, Nav, Footer }) => {
  const userFirstName = loggedInUser[0].firstName;
  //name:    The text display.
  //link:    The page link to that which will be displayed.
  //side:    The section in which the link item will be placed,
  //         with tasks being job/project-related items and account being
  //         account-related items.
  //role:    Who will see this.
  const profileItems = [
    {
      name: "New Job",
      link: "/new_job",
      side: "tasks",
      role: "both",
      summary: "Create a new job",
      jobType: "new"
    },
    {
      name: "Open Jobs",
      link: "/open_obs",
      side: "tasks",
      role: "both",
      summary: "View currently open jobs",
      jobType: "open"
    },
    {
      name: "Completed Jobs",
      link: "/completed_jobs",
      side: "tasks",
      role: "both",
      summary: "View completed jobs",
      jobType: "completed"
    },
    {
      name: "My Account",
      link: "/my_account",
      side: "account",
      role: "both",
      summary: "Account settings",
      accountCriteria: "settings"
    },
    {
      name: "Messages",
      link: "/messages",
      side: "account",
      role: "both",
      summary: "Message inbox",
      accountCriteria: "messages"
    },
    {
      name: "Billing",
      link: "/my_billing",
      side: "account",
      role: "customer",
      summary: "View your billing",
      accountCriteria: "billing"
    },
    {
      name: "Customer Billing",
      link: "/customer_billing",
      side: "account",
      role: "admin",
      summary: "View all customer billing",
      accountCriteria: "billing"
    }
  ];

  //Function to receive with which content area items will be concerned (either tasks or account).
  const fillContentArea = (side = "") => {
    const content = profileItems
      .filter(item => item.side === side)
      .map(item => {
        return (
          <Card style={{ margin: "5px", backgroundColor: "transparent" }}>
            <ExpansionPanel
              style={{ margin: "10px", backgroundColor: "#C9BE99" }}
            >
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <span className="item_summary_profile">{item.summary}</span>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                {item.side === "tasks" ? (
                  <Jobs jobType={item.jobType} loggedInUser={loggedInUser} />
                ) : (
                  <Account
                    accountCriteria={item.accountCriteria}
                    loggedInUser={loggedInUser}
                  />
                )}
              </ExpansionPanelDetails>
            </ExpansionPanel>
          </Card>
        );
      });

    return content;
  };

  return (
    <div className="wrapper_div">
      <h1 className="wrapper_header">Hello, {userFirstName}.</h1>
      <nav>
        <Nav userIsLoggedIn={userIsLoggedIn} />
      </nav>
      <div className="wrapper_body_div_profile">
        <div className="wrapper_body_div_profile_inner">
          <div className="wrapper_body_div_column_profile_left">
            {/*Tasks items from profileItems will be inserted here.*/}
            {fillContentArea("tasks")}
          </div>
          <div className="wrapper_body_div_column_profile_right">
            {/*Account items from profileItems will be inserted here.*/}
            {fillContentArea("account")}
          </div>
        </div>
      </div>
      <footer>
        <Footer userIsLoggedIn={userIsLoggedIn} loggedInUser={loggedInUser} />
      </footer>
    </div>
  );
};

export default Profile;
