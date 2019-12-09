/******************************************************************************************************************\
 *File:    EditInformation.js                                                                                      *
 *Author:  Christopher Perault                                                                                     *
 *Project: Roofmasters CMS (Customer Management System)                                                            *
 *Date:    December 6th, 2019                                                                                      *
 *Purpose: This component will represent the view in which users can edit account information.                     *
\******************************************************************************************************************/

import React from "react";
import TextField from "@material-ui/core/TextField";

const EditInformation = () => {
  return (
    <div className="edit_information_container">
      <div className="edit_information_body">
        <TextField
          id="current_address_name"
          label="Current Address"
        ></TextField>
      </div>
    </div>
  );
};

export default EditInformation;
