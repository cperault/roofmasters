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
import RemoveAccount from "./RemoveAccount.js";
import MessageDetails from "./MessageDetails.js";

const ProfileModal = ({
  handleModal,
  openModal,
  panel,
  panelItemName,
  loggedInUser
}) => {
  const setModalContent = () => {
    if (openModal) {
      switch (panelItemName) {
        case "Open Jobs":
          return <OpenJobDetails panel={panel} />;
        case "Completed Jobs":
          return <CompletedJobDetails panel={panel} />;
        case "Account Settings":
          switch (panel.id) {
            case 1:
              return <EditInformation />;
            case 2:
              return <PasswordReset loggedInUser={loggedInUser} />;
            case 3:
              return <RemoveAccount />;
            default:
          }
          break;
        case "Messages":
          return <MessageDetails panel={panel} />;
        default:
      }
    }
  };

  return (
    <Modal open={openModal}>
      <div
        className="modal-container"
        style={{ backgroundColor: "#c9cebd", border: "solid 1px #838e83" }}
      >
        <div className="modal-containe-body" style={{ padding: "10px" }}>
          <h1 className="modal-container-header">{panelItemName}</h1>
          {setModalContent()}
          <Button
            variant="contained"
            size="small"
            style={{
              float: "right",
              backgroundColor: "#64403e",
              color: "#c9cebd",
              marginTop: "10px"
            }}
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
