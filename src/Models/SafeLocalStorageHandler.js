/******************************************************************************************************************\
 *File:    SafeLocalStorageHandler.js                                                                             *
 *Author:  Christopher Perault                                                                                    *
 *Project: Roofmasters CMS (Customer Management System)                                                           *
 *Date:    September 9th, 2019                                                                                    *
 *Purpose: This helper function will set default value, passed in, to local storage variable if not set.          *
\******************************************************************************************************************/

const SafeLocalStorageHandler = (localStorageKey, defaultValue = "") => {
  //get the value of the key passed in
  let localStorageItem = localStorage.getItem(localStorageKey);

  //returns value of the key or returns default value to avoid throwing undefined error retrieving undefined key/value
  if (localStorageItem !== null && localStorageItem !== undefined) {
    return localStorageItem;
  } else if (defaultValue === "json") {
    const defaultJSONArray = [
      {
        value: "You're not logged in yet."
      }
    ];
    return JSON.stringify(defaultJSONArray);
  } else if (defaultValue === "bool") {
    return "false";
  } else {
    return defaultValue;
  }
};

export default SafeLocalStorageHandler;
