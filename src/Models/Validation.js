// /******************************************************************************************************************\
//  *File:    Validation.js                                                                                           *
//  *Author:  Christopher Perault                                                                                     *
//  *Project: Roofmasters CMS (Customer Management System)                                                            *
//  *Date:    September 25th, 2019                                                                                    *
//  *Purpose: This functional component file will serve as the validator to keep things DRY across files.             *
// \******************************************************************************************************************/

// const Validation = (credentials = [], formToValidate = "") => {
//   let isValid = false;
//   //array to store errors on the form
//   let errorArray = [];
//   //get number of elements in credentials array passed in
//   let count = credentials.length;
//   //regex variable
//   let regex = "";
//   //count variable for iterations
//   let iteration = 0;

//   //function to validate empty input
//   const isPresent = input => {
//     if (input !== "" || input !== null) {
//       return true;
//     }
//     return isValid;
//   };

//   //function to validate email
//   const isValidEmail = email => {
//     regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; //regex obtained from StackOverflow community user's comment (Andrew) on https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
//     if (regex.test(credentials[0])) {
//       isValid = true;
//     }
//     return isValid;
//   };

//   //function to validate phone number
//   const isValidPhoneNumber = phoneNumber => {
//     //check if number contains dashes; if not, add them
//     regex = /^\d{3}-\d{3}-\d{4}$/;
//     if (regex.test(phoneNumber)) {
//       isValid = true;
//     }
//     return isValid;
//   };

//   //function to validate special characters in input
//   const isSafeFromSpecialCharacters = input => {
//     //check if input has special characters
//     regex = /[#$%^&*()+=\-\[\]\';,.\/{}|":<>?~\\\\]/;
//     if (!regex.test(input)) {
//       isValid = true;
//     }
//     return isValid;
//   };
//   switch (formToValidate) {
//     /*
//     credentials passed in as array from Login.js:
//     credentials[0] = email address
//     credentials[1] = password
//     */
//     case "login":
//       //c = key, credentials[c] = value
//       for (var c in credentials) {
//         switch (c) {
//           case "Email address":
//             if (!isPresent(credentials[c])) {
//               errorArray.push(c + " is required");
//             } else if (!isValidEmail(credentials[c])) {
//               errorArray.push(c + " is required");
//             }
//             break;
//           case "Password":
//             if (!isPresent(credentials[c])) {
//               errorArray.push(c + " is required");
//             }
//             break;
//         }
//       }
//       break;
//     /*
//     credentials passed in as array from Registration.js:
//     credentials[0] = first name
//     credentials[1] = last name
//     credentials[2] = phone number
//     credentials[3] = email address
//     credentials[4] = password
//     */
//     case "registration":
//       //c = key, credentials[c] = value
//       for (var c in credentials) {
//         switch (c) {
//           case "First name":
//           case "Last name":
//             if (!isPresent(credentials[c])) {
//               errorArray.push(c + " is required");
//             } else if (!isSafeFromSpecialCharacters(credentials[c])) {
//               errorArray.push(c + " cannot contain special characters");
//             }
//             break;
//           case "Phone number":
//             if (!isPresent(credentials[c])) {
//               errorArray.push(c + " is required");
//             } else if (!isValidPhoneNumber(credentials[c])) {
//               errorArray.push(c + " is invalid");
//             }
//             break;
//           case "Email address":
//             if (!isPresent(credentials[c])) {
//               errorArray.push(c + " is required");
//             } else if (!isValidEmail(credentials[c])) {
//               errorArray.push(c + " is invalid");
//             }
//           case "Password":
//             if (!isPresent(credentials[c])) {
//               errorArray.push(c + " is required");
//             } else if (
//               credentials[c].length < 10 ||
//               credentials[c].length > 100
//             ) {
//               errorArray.push(c + " must be between 10 and 100 characters");
//             }
//             break;
//         }
//       }
//       break;
//     /*
//     credentials passed in as an array from Contact.js:
//     credentials[0] = contactName
//     credentials[1] = contactEmail
//     credentials[2] = contactDescriptionText
//     */
//     case "contact":
//       //c = key, credentials[c] = value
//       for (var c in credentials) {
//         switch (c) {
//           case "Contact name":
//             if (!isPresent(credentials[c])) {
//               errorArray.push(c + " is required");
//             } else if (!isSafeFromSpecialCharacters(credentials[c])) {
//               errorArray.push(c + " cannot contain special characters");
//             }
//             break;
//           case "Contact email":
//             if (!isPresent(credentials[c])) {
//               errorArray.push(c + " is required");
//             } else if (!isValidEmail(credentials[c])) {
//               errorArray.push(c + " is invalid");
//             }
//             break;
//           case "Contact description":
//             if (!isPresent(credentials[c])) {
//               errorArray.push(c + " is required");
//             } else if (credentials[c].length > 300) {
//               errorArray.push(c + " cannot exceed 300 characters");
//             }
//             break;
//         }
//       }
//       break;
//   }
//   return errorArray;
// };

// export default Validation;
