/******************************************************************************************************************\
 *File:    NewMessage.js                                                                                           *
 *Author:  Christopher Perault                                                                                     *
 *Project: Roofmasters CMS (Customer Management System)                                                            *
 *Date:    December 9th, 2019                                                                                      *
 *Purpose: This component represents the view into which a new message is expanded for composition                 *
\******************************************************************************************************************/

import React, { useState, useEffect } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import SendIcon from "@material-ui/icons/Send";
import CheckIcon from "@material-ui/icons/Check";
import axios from "axios";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";

const NewMessage = ({ panel, loggedInUser }) => {
  //hooks to manage state of new message
  const [messageSubject, setMessageSubject] = useState("");
  const [messageContent, setMessageContent] = useState("");
  //hook to manage button icon; default is the send arrow but then will be updated to checkmark icon on send
  const [sendIcon, setSendIcon] = useState(<SendIcon />);
  //hook to manage button text; default will be "send" but then be update to "Sent" on message send
  const [sendLabel, setSendLabel] = useState("Send");
  //hook to manage customer recipient for new message
  const [customerRecipient, setCustomerRecipient] = useState("");
  const [customerUserID, setCustomerUserID] = useState("");
  //hook to store all customers
  const [allCustomers, setAllCustomers] = useState([]);
  //method to send the new message
  const handleMessageSend = (subject, content) => {
    // //send message to backend
    axios
      .post(process.env.REACT_APP_ENDPOINT + "/send_new_message", {
        recipientUserID: customerUserID,
        senderUserID: panel[0].userID,
        senderFirstName: panel[0].firstName,
        senderLastName: panel[0].lastName,
        messageSubject: subject,
        messageContent: content
      })
      .then(response => {
        //take user back
        setSendIcon(<CheckIcon />);
        setSendLabel("Sent");
      });
  };

  //we need to get all customers so that admin can select one to message
  useEffect(() => {
    const userID = loggedInUser[0].userID;

    const getAllCustomers = () => {
      //get all customers so that a select menu can be chosen by admin to message one of the customers
      axios
        .post(process.env.REACT_APP_ENDPOINT + "/get_all_customers")
        .then(response => {
          setAllCustomers([]);
          setAllCustomers(response.data.all_customers);
        });
    };
    getAllCustomers();
  }, [loggedInUser]);

  //event handler for the select menu
  const handleSelect = event => {
    //store selected address for job
    setCustomerRecipient(event.target.value);
    //get selected index of event target sent
    let selectedIndex = event.target.options.selectedIndex;
    //get value of the data-key attribute and store in addressID hook
    let id = event.target.options[selectedIndex].getAttribute("data-key");
    setCustomerUserID(id);
  };
  return (
    <div className="new_message_container">
      <div className="new_messsage_body">
        <Card raised style={{ padding: "10px", backgroundColor: "#C9BE99" }}>
          <CardContent>
            {loggedInUser[0].userRole === "admin" && (
              <FormControl
                fullWidth
                style={{ marginTop: "10px", marginBottom: "30px" }}
              >
                <InputLabel htmlFor="customer-native-simple">
                  Which customer are you messaging?
                </InputLabel>
                <Select
                  native
                  value={customerRecipient}
                  key={customerUserID}
                  onChange={handleSelect}
                  inputProps={{
                    id: "customer-native-simple"
                  }}
                >
                  <option value=""></option>
                  {allCustomers.map(customer => {
                    return (
                      <option
                        key={customer.userID}
                        data-key={customer.userID}
                        value={customer.firstName + " " + customer.lastName}
                      >
                        {customer.firstName + " " + customer.lastName}
                      </option>
                    );
                  })}
                </Select>
              </FormControl>
            )}
            {loggedInUser[0].userRole === "customer" && (
              <TextField
                label="To"
                value="Emily Morris (Roofmasters)"
                fullWidth
                readOnly
              />
            )}
            <TextField
              label="From"
              value={panel[0].firstName + " " + panel[0].lastName}
              fullWidth
              readOnly
            />
            <TextField
              id="message_subject"
              label="Subject"
              value={messageSubject}
              fullWidth
              onChange={text => setMessageSubject(text.target.value)}
            />
            <br />
            <TextField
              id="message_content"
              label="Message"
              multiline
              rows="4"
              rowsMax="10"
              margin="normal"
              variant="outlined"
              fullWidth
              value={messageContent}
              onChange={text => setMessageContent(text.target.value)}
            />
            <Button
              style={{
                float: "right",
                backgroundColor: "#64403e",
                color: "white",
                margin: "2px"
              }}
              startIcon={sendIcon}
              onClick={() => handleMessageSend(messageSubject, messageContent)}
            >
              {sendLabel}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default NewMessage;
