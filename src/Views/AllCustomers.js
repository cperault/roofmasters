/******************************************************************************************************************\
 *File:    AllCustomers.js                                                                                        *
 *Author:  Christopher Perault                                                                                    *
 *Project: Roofmasters CMS (Customer Management System)                                                           *
 *Date:    December 10th, 2019                                                                                    *
 *Purpose: This component will show all customers for admins only                                                 *
\******************************************************************************************************************/

import React, { useState, useEffect } from "react";
import axios from "axios";
import Button from "@material-ui/core/Button";
import AutorenewIcon from "@material-ui/icons/Autorenew";

const AllCustomers = ({ loggedInUser, handleModal }) => {
  const [allCustomers, setAllCustomers] = useState([]);

  //function to refresh list manually
  const refreshList = () => {
    const user = loggedInUser[0].userID;
    axios
      .get(process.env.REACT_APP_ENDPOINT + "/get_all_customers")
      .then(response => {
        setAllCustomers(response.data.all_customers);
      });
  };
  //when the component is loaded, it will call the `getAllCustomers()` method once; user can refresh if they want, manually
  useEffect(() => {
    const user = loggedInUser[0].userID;
    //get open customers from DB and store in array
    const getAllCustomers = () => {
      axios
        .get(process.env.REACT_APP_ENDPOINT + "/get_all_customers")
        .then(response => {
          setAllCustomers(response.data.all_customers);
        });
    };

    getAllCustomers();
  }, [loggedInUser]);
  //iterate through array and display list items to be displayed in div on return
  return (
    <div className="all_customers_div">
      <table className="all_customers_table">
        <tbody>
          <tr>
            <th className="all_customers_table_header">First Name</th>
            <th className="all_customers_table_header">Last Name</th>
            <th className="all_customers_table_header">Email Address</th>
          </tr>
          {allCustomers.map(customer => {
            return (
              <tr>
                <td key={customer.userID}>{customer.firstName}</td>
                <td key={customer.userID}>{customer.lastName}</td>
                <td key={customer.userID}>{customer.emailAddress}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <Button
        variant="contained"
        size="small"
        style={{ backgroundColor: "#64403e", color: "#c9cebd" }}
        onClick={refreshList}
        startIcon={<AutorenewIcon />}
      >
        Refresh List
      </Button>
    </div>
  );
};

export default AllCustomers;
