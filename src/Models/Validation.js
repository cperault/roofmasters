/******************************************************************************************************************\
 *File:    Validation.js                                                                                           *
 *Author:  Christopher Perault                                                                                     *
 *Project: Roofmasters CMS (Customer Management System)                                                            *
 *Date:    September 25th, 2019                                                                                    *
 *Purpose: This functional component file will serve as the validator to keep things DRY across files.             *
\******************************************************************************************************************/

/*  credentials passed in as array from Registration.js:
    credentials[0] = first name
    credentials[1] = last name
    credentials[2] = phone number
    credentials[3] = email address
    credentials[4] = password

    credentials passed in as array from Login.js:
    credentials[0] = email address
    credentials[1] = password

    credentials passed in as an array from Contact.js:
    credentials[0] = contactName
    credentials[1] = contactEmail
    credentials[2] = contactDescriptionText
  */
const Validation = (credentials = [], formToValidate = "") => {
  let isValid = false;

  //function to check for empty input
  const inputIsValid = (fieldValue = []) => {
    if (fieldValue !== "") {
      return true;
    }
  };
  switch (formToValidate) {
    case "login":
      if (inputIsValid(credentials[0]) && inputIsValid(credentials[1])) {
        isValid = true;
      }
      break;
    case "registration":
      if (
        inputIsValid(credentials[0]) &&
        inputIsValid(credentials[1]) &&
        inputIsValid(credentials[2]) &&
        inputIsValid(credentials[3]) &&
        inputIsValid(credentials[4])
      ) {
        isValid = true;
      }
      break;
    case "contact":
      if (
        inputIsValid(credentials[0]) &&
        inputIsValid(credentials[1]) &&
        inputIsValid(credentials[2])
      ) {
        isValid = true;
      }
      break;
  }

  return isValid;
};

export default Validation;
