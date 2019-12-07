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
    { id: 1, name: "Edit my information" },
    { id: 2, name: "Reset my password" }
  ];

  return (
    <ul>
      {settings.map(setting => {
        return (
          <li
            key={setting.id}
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
