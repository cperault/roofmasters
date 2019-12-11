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
import NewMessage from "./NewMessage.js";
import AllJobsDetails from "./AllJobsDetails.js";

const ProfileModal = ({
  handleModal,
  openModal,
  panel,
  panelItemName,
  loggedInUser,
  messageType
}) => {
  const setModalContent = () => {
    if (openModal) {
      switch (panelItemName) {
        case "Open Jobs":
          return <OpenJobDetails panel={panel} />;
        case "All Jobs":
          return <AllJobsDetails panel={panel} />;
        case "Completed Jobs":
          return <CompletedJobDetails panel={panel} />;
        case "Account Settings":
          switch (panel.id) {
            case 1:
              return <EditInformation loggedInUser={loggedInUser} />;
            case 2:
              return <PasswordReset loggedInUser={loggedInUser} />;
            case 3:
              return <RemoveAccount />;
            default:
          }
          break;
        case "Messages":
          return (
            <MessageDetails
              loggedInUser={loggedInUser}
              panel={panel}
              handleModal={handleModal}
              messageType={messageType}
            />
          );
        case "New Message":
          return <NewMessage panel={panel} handleModal={handleModal} />;
        default:
      }
    }
  };

  return (
    <Modal open={openModal}>
      <div
        id="modal-address-updates"
        className="modal-container"
        style={{
          height: "800px",
          backgroundColor: "#c9cebd",
          border: "solid 1px #838e83",
          overflowY: "scroll"
        }}
      >
        <div className="modal-container-body" style={{ padding: "10px" }}>
          <h1 className="modal-container-header">{panelItemName}</h1>
          {setModalContent()}
          <Button
            className="modal-container-close"
            variant="contained"
            size="small"
            style={{
              float: "right",
              backgroundColor: "#64403e",
              color: "#c9cebd"
            }}
            onClick={() => handleModal("close", null)}
          >
            <span style={{ fontSize: "14px" }}>Close</span>
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ProfileModal;
