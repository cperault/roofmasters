/******************************************************************************************************************\
 *File:    EditInformation.js                                                                                      *
 *Author:  Christopher Perault                                                                                     *
 *Project: Roofmasters CMS (Customer Management System)                                                            *
 *Date:    December 6th, 2019                                                                                      *
 *Purpose: This component will represent the view in which users can edit account information.                     *
\******************************************************************************************************************/

import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import axios from "axios";
import SaveIcon from "@material-ui/icons/Save";
import CheckIcon from "@material-ui/icons/Check";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

const EditInformation = ({ loggedInUser }) => {
  let addressArray = loggedInUser[0]["userAddress"];
  let count = addressArray.length;
  //hook to hold errors from each form validation
  const [errorsOne, setErrorsOne] = useState([]);
  const [errorsTwo, setErrorsTwo] = useState([]);
  const [errorsThree, setErrorsThree] = useState([]);
  const [errorsFour, setErrorsFour] = useState([]);
  //hooks to manage state of address form values up to four addresses
  //address #1
  const [addressNameOne, setAddressNameOne] = useState("");
  const [addressCityOne, setAddressCityOne] = useState("");
  const [addressStateOne, setAddressStateOne] = useState("");
  const [addressZipOne, setAddressZipOne] = useState("");
  //address #2
  const [addressNameTwo, setAddressNameTwo] = useState("");
  const [addressCityTwo, setAddressCityTwo] = useState("");
  const [addressStateTwo, setAddressStateTwo] = useState("");
  const [addressZipTwo, setAddressZipTwo] = useState("");
  //address #3
  const [addressNameThree, setAddressNameThree] = useState("");
  const [addressCityThree, setAddressCityThree] = useState("");
  const [addressStateThree, setAddressStateThree] = useState("");
  const [addressZipThree, setAddressZipThree] = useState("");
  //address #4
  const [addressNameFour, setAddressNameFour] = useState("");
  const [addressCityFour, setAddressCityFour] = useState("");
  const [addressStateFour, setAddressStateFour] = useState("");
  const [addressZipFour, setAddressZipFour] = useState("");

  //hook to manage button icon; default is the save icon and will be updated to Check(mark) icon
  const [saveIconOne, setSaveIconOne] = useState(<SaveIcon />);
  const [saveIconTwo, setSaveIconTwo] = useState(<SaveIcon />);
  const [saveIconThree, setSaveIconThree] = useState(<SaveIcon />);
  const [saveIconFour, setSaveIconFour] = useState(<SaveIcon />);
  //hook to mange button text; default will be "Save" but then be update to "Updated" on address update
  const [saveLabelOne, setSaveLabelOne] = useState("Save");
  const [saveLabelTwo, setSaveLabelTwo] = useState("Save");
  const [saveLabelThree, setSaveLabelThree] = useState("Save");
  const [saveLabelFour, setSaveLabelFour] = useState("Save");

  //method to handle updating the address
  const updateAddress = (name, city, state, zip, addressNumber) => {
    let addressToUpdate = "";
    //check which address is being added/updated
    switch (addressNumber) {
      //user is updating address one
      case "one":
        addressToUpdate = "addressOneID";
        break;
      //user is updating address two
      case "two":
        addressToUpdate = "addressTwoID";
        break;
      //user is updating address three
      case "three":
        addressToUpdate = "addressThreeID";
        break;
      //user is updating address four
      case "four":
        addressToUpdate = "addressFourID";
        break;
      default:
    }
    //create the request
    axios
      .post(process.env.REACT_APP_ENDPOINT + "/update_address", {
        userID: loggedInUser[0].userID,
        addressName: name,
        addressCity: city,
        addressState: state,
        addressZip: zip,
        addressID: addressToUpdate
      })
      .then(response => {
        if (response.data.validation === "Failed") {
          let error = JSON.stringify(response.data.reasoning);
          switch (addressNumber) {
            //error on address one form
            case "one":
              setErrorsOne(JSON.parse(error));
              break;
            //error on address thwo form
            case "two":
              setErrorsTwo(JSON.parse(error));
              break;
            //error on address three form
            case "three":
              setErrorsThree(JSON.parse(error));
              break;
            //error on address four form
            case "four":
              setErrorsFour(JSON.parse(error));
              break;
            default:
          }
        } else {
          switch (addressNumber) {
            case "one":
              //change icon/label
              setSaveIconOne(<CheckIcon />);
              setSaveLabelOne("Updated");
              break;
            case "two":
              //change icon/label
              setSaveIconTwo(<CheckIcon />);
              setSaveLabelTwo("Updated");
              break;
            case "three":
              //change icon/label
              setSaveIconThree(<CheckIcon />);
              setSaveLabelThree("Updated");
              break;
            case "four":
              //change icon/label
              setSaveIconFour(<CheckIcon />);
              setSaveLabelFour("Updated");
              break;
            default:
          }
        }
      });
  };
  return (
    <div className="edit_information_container">
      <div className="edit_information_body">
        <h4 style={{ textAlign: "center" }}>
          We show the following {count === 1 ? "addresses" : "address"} on file:
        </h4>
        <Card raised style={{ padding: "10px", backgroundColor: "#C9BE99" }}>
          {addressArray.map(address => {
            return (
              <CardContent>
                <TextField
                  variant="outlined"
                  id="current_address_name"
                  label="Address"
                  value={address["userAddress"].addressName}
                  style={{ marginBottom: "10px" }}
                  InputProps={{
                    style: {
                      color: "#64403e",
                      fontSize: "14px"
                    }
                  }}
                  fullWidth
                  readOnly
                />
                <TextField
                  id="current_address_city"
                  variant="outlined"
                  label="City"
                  value={address["userAddress"].addressCity}
                  style={{ width: "40%", marginBottom: "15px" }}
                  readOnly
                  InputProps={{
                    style: {
                      color: "#64403e",
                      fontSize: "14px"
                    }
                  }}
                />
                <TextField
                  id="current_address_state"
                  variant="outlined"
                  label="State"
                  value={address["userAddress"].addressState}
                  style={{ width: "30%", marginBottom: "15px" }}
                  readOnly
                  InputProps={{
                    style: {
                      color: "#64403e",
                      marginLeft: "10px",
                      marginRight: "10px",
                      fontSize: "14px"
                    }
                  }}
                />
                <TextField
                  id="current_address_zip"
                  variant="outlined"
                  label="Zip"
                  value={address["userAddress"].addressZip}
                  style={{ width: "30%", marginBottom: "15px" }}
                  readOnly
                  InputProps={{
                    style: {
                      color: "#64403e",
                      fontSize: "14px"
                    }
                  }}
                />
              </CardContent>
            );
          })}
        </Card>
      </div>

      <h4 style={{ textAlign: "center" }}>
        You can update or add up to four addresses for your account.
      </h4>
      <React.Fragment>
        <div
          className="address_container_display_edit"
          style={{ padding: "5px", paddingBottom: "20px" }}
        >
          <h4 style={{ textAlign: "left", padding: "5px" }}>Address #1</h4>
          <Card raised style={{ padding: "10px", backgroundColor: "#C9BE99" }}>
            <CardContent>
              <TextField
                variant="outlined"
                id="current_address_name_edit"
                label="Address"
                value={addressNameOne}
                style={{ marginBottom: "10px" }}
                onChange={text => setAddressNameOne(text.target.value)}
                InputProps={{
                  style: {
                    color: "#64403e",
                    fontSize: "14px"
                  }
                }}
                fullWidth
              />
              <TextField
                id="current_address_city_edit"
                variant="outlined"
                label="City"
                value={addressCityOne}
                style={{ width: "40%", marginBottom: "15px" }}
                onChange={text => setAddressCityOne(text.target.value)}
                InputProps={{
                  style: {
                    color: "#64403e",
                    fontSize: "14px"
                  }
                }}
              />
              <TextField
                id="current_address_states_edit"
                variant="outlined"
                label="State"
                value={addressStateOne}
                style={{ width: "30%", marginBottom: "15px" }}
                onChange={text => setAddressStateOne(text.target.value)}
                InputProps={{
                  style: {
                    color: "#64403e",
                    marginLeft: "10px",
                    marginRight: "10px",
                    fontSize: "14px"
                  }
                }}
              />
              <TextField
                id="current_address_zip_edit"
                variant="outlined"
                label="Zip"
                value={addressZipOne}
                style={{ width: "30%", marginBottom: "15px" }}
                onChange={text => setAddressZipOne(text.target.value)}
                InputProps={{
                  style: {
                    color: "#64403e",
                    fontSize: "14px"
                  }
                }}
              />
              <Button
                style={{
                  backgroundColor: "#64403e",
                  marginTop: "10px",
                  marginBottom: "10px",
                  color: "white",
                  float: "right"
                }}
                startIcon={saveIconOne}
                onClick={() =>
                  updateAddress(
                    addressNameOne,
                    addressCityOne,
                    addressStateOne,
                    addressZipOne,
                    "one"
                  )
                }
              >
                {saveLabelOne}
              </Button>
              {errorsOne.length > 0 ? (
                <div className="new-address-form-error-div">
                  <h2>Please correct the following:</h2>
                  <ul>
                    {errorsOne.map(e => {
                      return <li>-{e}</li>;
                    })}
                  </ul>
                </div>
              ) : (
                ""
              )}
            </CardContent>
          </Card>
          <h4 style={{ textAlign: "left", padding: "5px" }}>Address #2</h4>
          <Card raised style={{ padding: "10px", backgroundColor: "#C9BE99" }}>
            <CardContent>
              <TextField
                variant="outlined"
                id="current_address_name_edit"
                label="Address"
                value={addressNameTwo}
                style={{ marginBottom: "10px" }}
                onChange={text => setAddressNameTwo(text.target.value)}
                InputProps={{
                  style: {
                    color: "#64403e",
                    fontSize: "14px"
                  }
                }}
                fullWidth
              />
              <TextField
                id="current_address_city_edit"
                variant="outlined"
                label="City"
                value={addressCityTwo}
                style={{ width: "40%", marginBottom: "15px" }}
                onChange={text => setAddressCityTwo(text.target.value)}
                InputProps={{
                  style: {
                    color: "#64403e",
                    fontSize: "14px"
                  }
                }}
              />
              <TextField
                id="current_address_state_edit"
                variant="outlined"
                label="State"
                value={addressStateTwo}
                style={{ width: "30%", marginBottom: "15px" }}
                onChange={text => setAddressStateTwo(text.target.value)}
                InputProps={{
                  style: {
                    color: "#64403e",
                    marginLeft: "10px",
                    marginRight: "10px",
                    fontSize: "14px"
                  }
                }}
              />
              <TextField
                id="current_address_zip_edit"
                variant="outlined"
                label="Zip"
                value={addressZipTwo}
                style={{ width: "30%", marginBottom: "15px" }}
                onChange={text => setAddressZipTwo(text.target.value)}
                InputProps={{
                  style: {
                    color: "#64403e",
                    fontSize: "14px"
                  }
                }}
              />
              <Button
                style={{
                  backgroundColor: "#64403e",
                  marginTop: "10px",
                  marginBottom: "10px",
                  color: "white",
                  float: "right"
                }}
                startIcon={saveIconTwo}
                onClick={() =>
                  updateAddress(
                    addressNameTwo,
                    addressCityTwo,
                    addressStateTwo,
                    addressZipTwo,
                    "two"
                  )
                }
              >
                {saveLabelTwo}
              </Button>
              {errorsTwo.length > 0 ? (
                <div className="new-address-form-error-div">
                  <h2>Please correct the following:</h2>
                  <ul>
                    {errorsTwo.map(e => {
                      return <li>-{e}</li>;
                    })}
                  </ul>
                </div>
              ) : (
                ""
              )}
            </CardContent>
          </Card>
          <h4 style={{ textAlign: "left", padding: "5px" }}>Address #3</h4>
          <Card raised style={{ padding: "10px", backgroundColor: "#C9BE99" }}>
            <CardContent>
              <TextField
                variant="outlined"
                id="current_address_name_edit"
                label="Address"
                value={addressNameThree}
                style={{ marginBottom: "10px" }}
                onChange={text => setAddressNameThree(text.target.value)}
                InputProps={{
                  style: {
                    color: "#64403e",
                    fontSize: "14px"
                  }
                }}
                fullWidth
              />
              <TextField
                id="current_address_city_edit"
                variant="outlined"
                label="City"
                value={addressCityThree}
                style={{ width: "40%", marginBottom: "15px" }}
                onChange={text => setAddressCityThree(text.target.value)}
                InputProps={{
                  style: {
                    color: "#64403e",
                    fontSize: "14px"
                  }
                }}
              />
              <TextField
                id="current_address_state_edit"
                variant="outlined"
                label="State"
                value={addressStateThree}
                style={{ width: "30%", marginBottom: "15px" }}
                onChange={text => setAddressStateThree(text.target.value)}
                InputProps={{
                  style: {
                    color: "#64403e",
                    marginLeft: "10px",
                    marginRight: "10px",
                    fontSize: "14px"
                  }
                }}
              />
              <TextField
                id="current_address_zip_edit"
                variant="outlined"
                label="Zip"
                value={addressZipThree}
                style={{ width: "30%", marginBottom: "15px" }}
                onChange={text => setAddressZipThree(text.target.value)}
                InputProps={{
                  style: {
                    color: "#64403e",
                    fontSize: "14px"
                  }
                }}
              />
              <Button
                style={{
                  backgroundColor: "#64403e",
                  marginTop: "10px",
                  marginBottom: "10px",
                  color: "white",
                  float: "right"
                }}
                startIcon={saveIconThree}
                onClick={() =>
                  updateAddress(
                    addressNameThree,
                    addressCityThree,
                    addressStateThree,
                    addressZipThree,
                    "three"
                  )
                }
              >
                {saveLabelThree}
              </Button>
              {errorsThree.length > 0 ? (
                <div className="new-address-form-error-div">
                  <h2>Please correct the following:</h2>
                  <ul>
                    {errorsThree.map(e => {
                      return <li>-{e}</li>;
                    })}
                  </ul>
                </div>
              ) : (
                ""
              )}
            </CardContent>
          </Card>
          <h4 style={{ textAlign: "left", padding: "5px" }}>Address #4</h4>
          <Card raised style={{ padding: "10px", backgroundColor: "#C9BE99" }}>
            <CardContent>
              <TextField
                variant="outlined"
                id="current_address_name_edit"
                label="Address"
                value={addressNameFour}
                style={{ marginBottom: "10px" }}
                onChange={text => setAddressNameFour(text.target.value)}
                InputProps={{
                  style: {
                    color: "#64403e",
                    fontSize: "14px"
                  }
                }}
                fullWidth
              />
              <TextField
                id="current_address_city_edit"
                variant="outlined"
                label="City"
                value={addressCityFour}
                style={{ width: "40%", marginBottom: "15px" }}
                onChange={text => setAddressCityFour(text.target.value)}
                InputProps={{
                  style: {
                    color: "#64403e",
                    fontSize: "14px"
                  }
                }}
              />
              <TextField
                id="current_address_state_edit"
                variant="outlined"
                label="State"
                value={addressStateFour}
                style={{ width: "30%", marginBottom: "15px" }}
                onChange={text => setAddressStateFour(text.target.value)}
                InputProps={{
                  style: {
                    color: "#64403e",
                    marginLeft: "10px",
                    marginRight: "10px",
                    fontSize: "14px"
                  }
                }}
              />
              <TextField
                id="current_address_zip_edit"
                variant="outlined"
                label="Zip"
                value={addressZipFour}
                style={{ width: "30%", marginBottom: "15px" }}
                onChange={text => setAddressZipFour(text.target.value)}
                InputProps={{
                  style: {
                    color: "#64403e",
                    fontSize: "14px"
                  }
                }}
              />
              <Button
                style={{
                  backgroundColor: "#64403e",
                  marginTop: "10px",
                  marginBottom: "10px",
                  color: "white",
                  float: "right"
                }}
                startIcon={saveIconFour}
                onClick={() =>
                  updateAddress(
                    addressNameFour,
                    addressCityFour,
                    addressStateFour,
                    addressZipFour,
                    "four"
                  )
                }
              >
                {saveLabelFour}
              </Button>
              {errorsFour.length > 0 ? (
                <div className="new-address-form-error-div">
                  <h2>Please correct the following:</h2>
                  <ul>
                    {errorsFour.map(e => {
                      return <li>-{e}</li>;
                    })}
                  </ul>
                </div>
              ) : (
                ""
              )}
            </CardContent>
          </Card>
        </div>
      </React.Fragment>
    </div>
  );
};

export default EditInformation;
