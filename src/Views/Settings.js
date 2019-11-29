/******************************************************************************************************************\
 *File:    Settings.js                                                                                             *
 *Author:  Christopher Perault                                                                                     *
 *Project: Roofmasters CMS (Customer Management System)                                                            *
 *Date:    October 26th, 2019                                                                                      *
 *Purpose: This component will be where all account settings are displayed and managed                             *
\******************************************************************************************************************/
import React from "react";

const Settings = () => {
  const settings = [
    { id: 1, settingName: "Edit my information" },
    { id: 2, settingName: "This is another account setting..." },
    { id: 3, settingName: "And this is anotherrrrrr account setting..." }
  ];
  const settingsList = settings.map(setting => {
    return (
      <p key={setting.id} style={{ textAlign: "left" }}>
        {setting.settingName}
      </p>
    );
  });

  return <div>{settingsList}</div>;
};

export default Settings;
