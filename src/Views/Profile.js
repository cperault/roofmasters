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
  const userRole = loggedInUser[0].userRole;
  //name:    The text display.
  //link:    The page link to that which will be displayed.
  //side:    The section in which the link item will be placed,
  //         with tasks being job/project-related items and account being
  //         account-related items.
  //role:    Who will see this.
  const profileItems = [
    {
      id: 1,
      name: "New Job",
      link: "/new_job",
      side: "tasks",
      role: "both",
      summary: "Create a new job",
      jobType: "new"
    },
    {
      id: 2,
      name: "Open Jobs",
      link: "/open_obs",
      side: "tasks",
      role: "both",
      summary: "View currently open jobs",
      jobType: "open"
    },
    {
      id: 3,
      name: "Completed Jobs",
      link: "/completed_jobs",
      side: "tasks",
      role: "both",
      summary: "View completed jobs",
      jobType: "completed"
    },
    {
      id: 4,
      name: "My Account",
      link: "/my_account",
      side: "account",
      role: "both",
      summary: "Account settings",
      accountCriteria: "settings"
    },
    {
      id: 5,
      name: "Messages",
      link: "/messages",
      side: "account",
      role: "both",
      summary: "Message inbox",
      accountCriteria: "messages"
    },
    {
      id: 6,
      name: "Billing",
      link: "/my_billing",
      side: "account",
      role: "customer",
      summary: "View your billing",
      accountCriteria: "billing"
    },
    {
      id: 7,
      name: "Customer Billing",
      link: "/customer_billing",
      side: "account",
      role: "admin",
      summary: "View all customer billing",
      accountCriteria: "billing"
    }
  ];

  //Function to receive with which content area items will be concerned (either tasks or account).
  const fillContentArea = (side = "", role = "") => {
    const content = profileItems
      .filter(item => item.side === side)
      .filter(item => item.role === role || item.role === "both")
      .map(item => {
        return (
          <Card
            key={item.id}
            style={{
              margin: "5px",
              backgroundColor: "transparent",
              border: "solid 1px #c9cebd"
            }}
          >
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
    <React.Fragment>
      <div className="topnav">
        <Nav userIsLoggedIn={userIsLoggedIn} />
      </div>
      <div className="wrapper_div">
        <h1 className="wrapper_header">Hello, {userFirstName}.</h1>
        <div className="wrapper_body_div_profile">
          <div className="wrapper_body_div_profile_inner">
            <div className="wrapper_body_div_column_profile_left">
              {/*Tasks items from profileItems will be inserted here.*/}
              {fillContentArea("tasks", userRole)}
            </div>
            <div className="wrapper_body_div_column_profile_right">
              {/*Account items from profileItems will be inserted here.*/}
              {fillContentArea("account", userRole)}
            </div>
          </div>
        </div>
        <footer>
          <Footer userIsLoggedIn={userIsLoggedIn} loggedInUser={loggedInUser} />
        </footer>
      </div>
    </React.Fragment>
  );
};

export default Profile;
