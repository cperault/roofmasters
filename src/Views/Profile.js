/******************************************************************************************************************\
 *File:    Profile.js                                                                                              *
 *Author:  Christopher Perault                                                                                     *
 *Project: Roofmasters CMS (Customer Management System)                                                            *
 *Date:    August 8th, 2019                                                                                        *
 *Purpose: This is the profile page view.                                                                          *
\******************************************************************************************************************/

import React from "react";

const Profile = ({ userIsLoggedIn, loggedInUser, Nav, Footer }) => {
  const userFirstName = loggedInUser[0].firstName;
  //name:    The text display.
  //link:    The page link to that which will be displayed.
  //side:    The section in which the link item will be placed,
  //         with tasks being job/project-related items and account being
  //         account-related items.
  //role:    Who will see this.
  const profileItems = [
    { name: "New Job", link: "/new_job", side: "tasks", role: "both" },
    { name: "Open Jobs", link: "/open_obs", side: "tasks", role: "both" },
    {
      name: "Completed Jobs",
      link: "/completed_jobs",
      side: "tasks",
      role: "both"
    },
    {
      name: "My Account",
      link: "/my_account",
      side: "account",
      role: "both"
    },
    { name: "Messages", link: "/messages", side: "account", role: "both" },
    {
      name: "Billing",
      link: "/my_billing",
      side: "account",
      role: "customer"
    },
    {
      name: "Customer Billing",
      link: "/customer_billing",
      side: "account",
      role: "admin"
    }
  ];

  //Function to receive with which content area items will be concerned (either tasks or account).
  const fillContentArea = (side = "") => {
    const content = profileItems
      .filter(item => item.side === side)
      .map(item => {
        return (
          <p className="wrapper_body_div_column_item">
            <a href={item.link}>{item.name}</a>
          </p>
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
        <div className="wrapper_body_div_column_profile_left">
          {/*Tasks items from profileItems will be inserted here.*/}
          {fillContentArea("tasks")}
        </div>
        <div className="wrapper_body_div_column_profile_right">
          {/*Account items from profileItems will be inserted here.*/}
          {fillContentArea("account")}
        </div>
      </div>
      <footer>
        <Footer userIsLoggedIn={userIsLoggedIn} loggedInUser={loggedInUser} />
      </footer>
    </div>
  );
};

export default Profile;
