/******************************************************************************************************************\
 *File:    Services.js                                                                                             *
 *Author:  Christopher Perault                                                                                     *
 *Project: Roofmasters CMS (Customer Management System)                                                            *
 *Date:    August 28th, 2019                                                                                       *
 *Purpose: This is the services page view component                                                                *
\******************************************************************************************************************/
import React from "react";
const Services = ({ loggedInUser, userIsLoggedIn, Nav, Footer }) => {
  //array to store available services
  const servicesArray = [
    {
      name: "Roofing",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nisl tincidunt eget nullam non nisi est sit. In arcu cursus euismod quis viverra nibh cras pulvinar. Habitant morbi tristique senectus et netus. Elementum sagittis vitae et leo duis ut diam. Nullam eget felis eget nunc lobortis mattis aliquam faucibus. Magna ac placerat vestibulum lectus mauris ultrices eros in cursus. Enim ut tellus elementum sagittis. Purus semper eget duis at tellus at urna condimentum. Egestas egestas fringilla phasellus faucibus scelerisque eleifend. Viverra aliquet eget sit amet tellus cras adipiscing. Integer vitae justo eget magna fermentum iaculis. Sed id semper risus in hendrerit gravida rutrum. Bibendum arcu vitae elementum curabitur vitae nunc sed velit dignissim. Mattis nunc sed blandit libero volutpat sed cras. Habitant morbi tristique senectus et netus et malesuada fames. Sit amet consectetur adipiscing elit ut aliquam purus sit. Quisque sagittis purus sit amet volutpat."
    },
    {
      name: "Siding",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut eu sem integer vitae justo eget magna. Enim nec dui nunc mattis. Sed vulputate odio ut enim blandit volutpat maecenas volutpat blandit. Ipsum a arcu cursus vitae congue mauris rhoncus aenean vel. Est placerat in egestas erat imperdiet sed euismod. Varius quam quisque id diam vel. Non odio euismod lacinia at quis risus sed vulputate odio. Nibh mauris cursus mattis molestie a. Est velit egestas dui id ornare arcu odio."
    },
    {
      name: "Gutters",
      description:
        "Euismod in pellentesque massa placerat duis. Ultrices vitae auctor eu augue ut lectus. Montes nascetur ridiculus mus mauris vitae ultricies. Pellentesque eu tincidunt tortor aliquam nulla facilisi cras. Eget lorem dolor sed viverra ipsum. Viverra ipsum nunc aliquet bibendum. Tortor condimentum lacinia quis vel eros donec ac odio tempor. Cursus metus aliquam eleifend mi. Hendrerit dolor magna eget est lorem ipsum dolor sit. Viverra mauris in aliquam sem fringilla ut morbi. Sed arcu non odio euismod."
    }
  ];
  return (
    <React.Fragment>
      <div className="topnav">
        <Nav userIsLoggedIn={userIsLoggedIn} />
      </div>
      <div className="wrapper_div">
        <h1 className="wrapper_header">Services We Provide</h1>
        <div className="wrapper_body_div">
          {servicesArray.map(service => {
            return (
              <div className="wrapper_body_content_div">
                <h2 className="wrapper_body_div_content_paragraph_header">
                  {service.name}
                </h2>
                <p className="wrapper_body_div_content_paragraph">
                  {service.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </React.Fragment>
  );
};

export default Services;
