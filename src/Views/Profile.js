/******************************************************************************************************************\
 *File:    Profile.js                                                                                              *
 *Author:  Christopher Perault                                                                                     *
 *Project: Roofmasters CMS (Customer Management System)                                                            *
 *Date:    August 8th, 2019                                                                                        *
 *Purpose: This is the profile page view.                                                                          *
\******************************************************************************************************************/

import React, { useState } from "react";
import { Card } from "@material-ui/core";
import { ExpansionPanel } from "@material-ui/core";
import { ExpansionPanelSummary } from "@material-ui/core";
import { ExpansionPanelDetails } from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Jobs from "./Jobs.js";
import Account from "./Account.js";
import Admin from "./Admin.js";
import ProfileModal from "./ProfileModal.js";

const Profile = ({ userIsLoggedIn, loggedInUser, Nav, Footer }) => {
  const userFirstName = loggedInUser[0].firstName;
  const userRole = loggedInUser[0].userRole;
  const [openModal, setOpenModal] = useState(false);
  const [panel, setPanel] = useState({});
  const [messageType, setMessageType] = useState("received");

  const [panelItemName, setPanelItemName] = useState();
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
      role: "customer",
      summary: "Create a new job",
      jobType: "new"
    },
    {
      id: 2,
      name: "Open Jobs",
      link: "/open_jobs",
      side: "tasks",
      role: "customer",
      summary: "Open jobs",
      jobType: "open"
    },
    {
      id: 3,
      name: "View All Jobs",
      link: "/view_all_jobs",
      side: "account",
      role: "admin",
      summary: "View all jobs",
      accountCriteria: "All Jobs"
    },
    {
      id: 4,
      name: "View All Customers",
      link: "/view_all_customers",
      side: "account",
      role: "admin",
      summary: "View all customers",
      accountCriteria: "All Customers"
    },
    {
      id: 5,
      name: "Completed Jobs",
      link: "/completed_jobs",
      side: "tasks",
      role: "customer",
      summary: "Completed jobs",
      jobType: "completed"
    },
    {
      id: 6,
      name: "My Account",
      link: "/my_account",
      side: "account",
      role: "both",
      summary: "Account settings",
      accountCriteria: "settings"
    },
    {
      id: 7,
      name: "Messages",
      link: "/messages",
      side: "account",
      role: "both",
      summary: "Message inbox",
      accountCriteria: "messages"
    }
    // {
    //   id: 8,
    //   name: "Billing",
    //   link: "/my_billing",
    //   side: "account",
    //   role: "customer",
    //   summary: "Your billing",
    //   accountCriteria: "billing"
    // },
    // {
    //   id: 9,
    //   name: "Customer Billing",
    //   link: "/customer_billing",
    //   side: "account",
    //   role: "admin",
    //   summary: "View all customer billing",
    //   accountCriteria: "billing"
    // }
  ];
  //modal to be activated on specific click events to handle expansion for individual profile panels
  const handleModal = (action = "", panel, panelName, messageType) => {
    setPanelItemName(panelName);
    //pass which panel is being sent to the modal for expansion
    setPanel(panel);
    //toggle open/close of model
    setOpenModal(!openModal);
    //set message type "received or sent"
    setMessageType(messageType);
  };

  //Function to receive with which content area items will be concerned (tasks or account) for admin roles logged in
  const fillContentAreaAdmin = (side = "", role = "") => {
    const content = profileItems
      .filter(item => item.side === side)
      .filter(item => item.role === "admin" || item.role === "both")
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
              <ExpansionPanelSummary
                key={item.id}
                expandIcon={<ExpandMoreIcon />}
              >
                <span className="admin_item_summary_profile">
                  {item.summary}
                </span>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <div className="admin_profile_expansion_panel_details_div">
                  <Admin
                    accountCriteria={item.accountCriteria}
                    loggedInUser={loggedInUser}
                    handleModal={handleModal}
                  />
                </div>
              </ExpansionPanelDetails>
            </ExpansionPanel>
          </Card>
        );
      });

    return content;
  };
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
              <ExpansionPanelSummary
                key={item.id}
                expandIcon={<ExpandMoreIcon />}
              >
                <span className="item_summary_profile">{item.summary}</span>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <div className="profile_expansion_panel_details_div">
                  {item.side === "tasks" ? (
                    <Jobs
                      jobType={item.jobType}
                      loggedInUser={loggedInUser}
                      handleModal={handleModal}
                    />
                  ) : (
                    <Account
                      accountCriteria={item.accountCriteria}
                      loggedInUser={loggedInUser}
                      handleModal={handleModal}
                    />
                  )}
                </div>
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
      <div className="wrapper_div_profile">
        <h1 className="wrapper_header">Hello, {userFirstName}.</h1>
        <div className="wrapper_body_div_profile">
          <div className="wrapper_body_div_profile_inner">
            {/*Tasks items from profileItems will be inserted here.*/}
            {userRole === "customer" && (
              <div className="wrapper_body_div_column_profile_left">
                {fillContentArea("tasks", userRole)}
              </div>
            )}
            {/*Account items from profileItems will be inserted here.*/}
            {userRole === "customer" && (
              <div className="wrapper_body_div_column_profile_right">
                {fillContentArea("account", userRole)}
              </div>
            )}
            {userRole === "admin" && (
              <div className="admin_wrapper_body_div_column_profile_right">
                {fillContentAreaAdmin("account", userRole)}
              </div>
            )}
            <ProfileModal
              handleModal={handleModal}
              openModal={openModal}
              panel={panel}
              setPanel={setPanel}
              panelItemName={panelItemName}
              loggedInUser={loggedInUser}
              messageType={messageType}
            />
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
