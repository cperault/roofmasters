/******************************************************************************************************************\
 *File:    ProfileModal.js                                                                                         *
 *Author:  Christopher Perault                                                                                     *
 *Project: Roofmasters CMS (Customer Management System)                                                            *
 *Date:    December 6th, 2019                                                                                      *
 *Purpose: This is the modal component into which profile panels will be expanded for more CRUD-y stuff.           *
\******************************************************************************************************************/

import React from "react";
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";
import EditInformation from "./EditInformation.js";
import OpenJobDetails from "./OpenJobDetails.js";
import CompletedJobDetails from "./CompletedJobDetails.js";
import PasswordReset from "./PasswordReset.js";

const ProfileModal = ({
  handleModal,
  openModal,
  panel,
  panelItemName,
  formatDateFromDB
}) => {
  const setModalContent = () => {
    if (openModal) {
      switch (panelItemName) {
        case "Open Jobs":
          return <OpenJobDetails panel={panel} />;
        case "Completed Jobs":
          return <CompletedJobDetails />;
        case "Account Settings":
          switch (panel.id) {
            case 1:
              return <EditInformation />;
            case 2:
              return <PasswordReset />;
            default:
          }
          break;
        default:
      }
    }
  };

  //const setModalContent = () => {};
  return (
    <Modal open={openModal}>
      <div className="modal-container">
        <div className="modal-containe-body">
          <h1 className="modal-container-header">{panelItemName}</h1>
          {setModalContent()}
          <Button
            variant="contained"
            size="small"
            style={{ float: "right" }}
            onClick={() => handleModal("close", null)}
          >
            Close
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ProfileModal;
