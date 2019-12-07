/******************************************************************************************************************\
 *File:    Settings.js                                                                                             *
 *Author:  Christopher Perault                                                                                     *
 *Project: Roofmasters CMS (Customer Management System)                                                            *
 *Date:    October 26th, 2019                                                                                      *
 *Purpose: This component will be where all account settings are displayed and managed                             *
\******************************************************************************************************************/
import React from "react";

const Settings = ({ handleModal }) => {
  const settings = [
    { id: 1, name: "Edit my account information" },
    { id: 2, name: "Reset my access password" },
    { id: 3, name: "Delete my account" }
  ];

  return (
    <ul className="settings-ul">
      {settings.map(setting => {
        return (
          <li
            key={setting.id}
            className="settings_item"
            onClick={() => handleModal("open", setting, "Account Settings")}
          >
            {setting.name}
          </li>
        );
      })}
    </ul>
  );
};

export default Settings;
