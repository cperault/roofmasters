/******************************************************************************************************************\
 *File:    About.js                                                                                                *
 *Author:  Christopher Perault                                                                                     *
 *Project: Roofmasters CMS (Customer Management System)                                                            *
 *Date:    August 8th, 2019                                                                                        *
 *Purpose: This is the about page view component.                                                                  *
\******************************************************************************************************************/
import React from "react";
const About = ({ userIsLoggedIn, loggedInUser, Nav, Footer }) => {
  return (
    <React.Fragment>
      <div className="topnav">
        <Nav userIsLoggedIn={userIsLoggedIn} />
      </div>
      <div className="wrapper_div">
        <h1 className="wrapper_header">About Us</h1>
        <div className="wrapper_body_div">
          <div className="wrapper_body_content_div">
            <p className="wrapper_body_div_content_paragraph">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Cursus
              in hac habitasse platea dictumst quisque. Pellentesque diam
              volutpat commodo sed egestas egestas. Morbi tempus iaculis urna id
              volutpat lacus laoreet non. Convallis convallis tellus id interdum
              velit laoreet id donec ultrices. Diam vulputate ut pharetra sit
              amet aliquam id diam. Et ligula ullamcorper malesuada proin.
              Lectus mauris ultrices eros in cursus turpis. Eu volutpat odio
              facilisis mauris sit amet. Nullam vehicula ipsum a arcu cursus
              vitae congue mauris. Euismod lacinia at quis risus sed vulputate
              odio. Mauris in aliquam sem fringilla ut. Augue lacus viverra
              vitae congue eu consequat ac felis. Odio ut enim blandit volutpat.
              Amet venenatis urna cursus eget nunc scelerisque viverra mauris.
            </p>
            <p className="wrapper_body_div_content_paragraph">
              Mi eget mauris pharetra et ultrices neque ornare aenean euismod.
              Ante in nibh mauris cursus mattis molestie a iaculis. Sodales ut
              etiam sit amet nisl purus in mollis. Blandit massa enim nec dui
              nunc. Commodo elit at imperdiet dui accumsan sit amet. Turpis
              massa sed elementum tempus egestas sed sed. Amet nisl purus in
              mollis nunc. Massa tincidunt dui ut ornare lectus sit. Felis eget
              nunc lobortis mattis aliquam faucibus purus. Aliquam faucibus
              purus in massa tempor nec feugiat. Nisl purus in mollis nunc sed
              id semper. Rhoncus urna neque viverra justo nec. Feugiat nisl
              pretium fusce id velit ut tortor. Aenean vel elit scelerisque
              mauris. Risus quis varius quam quisque id diam vel quam elementum.
            </p>
            <p className="wrapper_body_div_content_paragraph">
              Sit amet porttitor eget dolor morbi non arcu risus quis. Mattis
              ullamcorper velit sed ullamcorper morbi. Sed enim ut sem viverra
              aliquet eget sit amet. Aliquam id diam maecenas ultricies mi eget
              mauris pharetra. Auctor eu augue ut lectus arcu. Id eu nisl nunc
              mi ipsum faucibus. Et sollicitudin ac orci phasellus. Arcu risus
              quis varius quam quisque id diam. Accumsan tortor posuere ac ut.
              Sem integer vitae justo eget magna fermentum iaculis eu.
            </p>
            <p className="wrapper_body_div_content_paragraph">
              Nisi lacus sed viverra tellus in hac habitasse platea dictumst.
              Proin sagittis nisl rhoncus mattis rhoncus urna neque viverra.
              Suscipit tellus mauris a diam. Aliquet sagittis id consectetur
              purus ut. Lacus vel facilisis volutpat est velit egestas. Diam
              phasellus vestibulum lorem sed risus ultricies tristique. Blandit
              aliquam etiam erat velit scelerisque in dictum non consectetur.
              Lorem mollis aliquam ut porttitor. Neque vitae tempus quam
              pellentesque nec. Lobortis mattis aliquam faucibus purus in massa
              tempor nec. Morbi tristique senectus et netus et malesuada fames
              ac. Justo nec ultrices dui sapien eget mi. Pellentesque nec nam
              aliquam sem et tortor consequat. Quis risus sed vulputate odio ut
              enim. Consequat interdum varius sit amet. Quam id leo in vitae.
              Suspendisse interdum consectetur libero id. Sed arcu non odio
              euismod lacinia at. Morbi tincidunt ornare massa eget egestas
              purus.
            </p>
          </div>
        </div>
        <footer>
          <Footer userIsLoggedIn={userIsLoggedIn} loggedInUser={loggedInUser} />
        </footer>
      </div>
    </React.Fragment>
  );
};

export default About;
