/******************************************************************************************************************\
 *File:    Landing.js                                                                                              *
 *Author:  Christopher Perault                                                                                     *
 *Project: Roofmasters CMS (Customer Management System)                                                            *
 *Date:    August 28th, 2019                                                                                       *
 *Purpose: This is the landing page view component.                                                                *
\******************************************************************************************************************/

import React from "react";

const Landing = ({ userIsLoggedIn, loggedInUser, Nav, Footer }) => {
  return (
    <React.Fragment>
      <div className="topnav">
        <Nav userIsLoggedIn={userIsLoggedIn} />
      </div>
      <div className="wrapper_div">
        <h1 className="wrapper_header">Welcome to Roof Masters</h1>
        <div className="wrapper_body_content_div">
          <p className="landing_wrapper_body_div_content_paragraph">
            <img
              className="left_image"
              alt="House roofing"
              src={require("../Media/roofing.jpg")}
            />
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Aenean
            euismod elementum nisi quis. Lorem ipsum dolor sit amet consectetur
            adipiscing elit ut aliquam. Euismod elementum nisi quis eleifend
            quam adipiscing vitae proin. Vulputate dignissim suspendisse in est
            ante in nibh mauris. Sagittis vitae et leo duis ut diam. Eget dolor
            morbi non arcu. Id diam maecenas ultricies mi. Est ultricies integer
            quis auctor elit. Neque aliquam vestibulum morbi blandit cursus
            risus at ultrices. Velit euismod in pellentesque massa placerat duis
            ultricies lacus sed. Mi tempus imperdiet nulla malesuada
            pellentesque elit eget gravida cum. Ornare massa eget egestas purus
            viverra accumsan in. Enim tortor at auctor urna. Id ornare arcu odio
            ut sem nulla pharetra. Quis viverra nibh cras pulvinar. Platea
            dictumst vestibulum rhoncus est pellentesque. Proin nibh nisl
            condimentum id. Nisl tincidunt eget nullam non nisi est sit amet
            facilisis. Consectetur adipiscing elit duis tristique. Mattis
            vulputate enim nulla aliquet. Euismod in pellentesque massa placerat
            duis ultricies lacus.
          </p>
        </div>
        <div className="wrapper_body_content_div">
          <p className="landing_wrapper_body_div_content_paragraph">
            <img
              className="right_image"
              alt="House roofing"
              src={require("../Media/siding.jpg")}
            />
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.. Magna
            sit amet purus gravida quis blandit turpis cursus. Nulla
            pellentesque dignissim enim sit amet venenatis urna cursus eget.
            Nisi est sit amet facilisis magna etiam. Ipsum suspendisse ultrices
            gravida dictum fusce ut placerat orci nulla. Massa vitae tortor
            condimentum lacinia quis vel eros donec. Aliquam faucibus purus in
            massa. Ipsum nunc aliquet bibendum enim facilisis gravida neque
            convallis. Ornare lectus sit amet est placerat in egestas. Lorem
            ipsum dolor sit amet consectetur adipiscing. Adipiscing at in tellus
            integer feugiat scelerisque varius. Odio tempor orci dapibus
            ultrices in iaculis nunc. Nisl purus in mollis nunc. Commodo elit at
            imperdiet dui accumsan sit amet nulla. Ut enim blandit volutpat
            maecenas. Enim nulla aliquet porttitor lacus luctus accumsan tortor
            posuere. Mauris ultrices eros in cursus turpis massa. Et tortor at
            risus viverra. Imperdiet dui accumsan sit amet. Sit amet purus
            gravida quis blandit turpis. Montes nascetur ridiculus mus mauris.
            In hendrerit gravida rutrum quisque non tellus. Lobortis elementum
            nibh tellus molestie nunc. Non sodales neque sodales ut. Mattis nunc
            sed blandit libero volutpat sed. Fames ac turpis egestas maecenas
            pharetra convallis. Rhoncus est pellentesque elit ullamcorper
            dignissim cras tincidunt lobortis feugiat.
          </p>
          <br />
        </div>
        <div className="wrapper_body_content_div">
          <p className="landing_wrapper_body_div_content_paragraph">
            <img
              className="left_image"
              alt="House roofing"
              src={require("../Media/gutters.jpg")}
            />
            Id interdum velit laoreet id. Blandit cursus risus at ultrices.
            Morbi enim nunc faucibus a pellentesque sit. Nibh nisl condimentum
            id venenatis a condimentum vitae sapien. Erat pellentesque
            adipiscing commodo elit at imperdiet dui. Vitae tortor condimentum
            lacinia quis vel. Quis viverra nibh cras pulvinar mattis nunc sed.
            Justo eget magna fermentum iaculis eu non diam phasellus. Rhoncus
            est pellentesque elit ullamcorper dignissim cras tincidunt lobortis
            feugiat. Suscipit tellus mauris a diam maecenas sed. Tincidunt vitae
            semper quis lectus nulla at volutpat diam ut. Nec feugiat nisl
            pretium fusce. Eu consequat ac felis donec et odio pellentesque diam
            volutpat. At risus viverra adipiscing at. Hac habitasse platea
            dictumst quisque. Pellentesque habitant morbi tristique senectus et
            netus. At lectus urna duis convallis convallis tellus id interdum
            velit. Leo vel orci porta non pulvinar neque laoreet suspendisse
            interdum. Consequat interdum varius sit amet mattis. Arcu cursus
            euismod quis viverra nibh cras pulvinar mattis nunc. Facilisis
            gravida neque convallis a cras. Lectus urna duis convallis convallis
            tellus id interdum velit.
          </p>
        </div>
        <Footer userIsLoggedIn={userIsLoggedIn} loggedInUser={loggedInUser} />
      </div>
    </React.Fragment>
  );
};

export default Landing;
