import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import "./Main.css";
import auth from "../../reducers/auth";

const Main = ({ auth: { isAuthenticated } }) => {
  return (
    <div>
      <style
        type="text/css"
        dangerouslySetInnerHTML={{
          __html:
            "\n\n    .hidden.menu {\n      display: none;\n    }\n\n    .masthead.segment {\n      min-height: 700px;\n      padding: 1em 0em;\n    }\n    .masthead .logo.item img {\n      margin-right: 1em;\n    }\n    .masthead .ui.menu .ui.button {\n      margin-left: 0.5em;\n    }\n    .masthead h1.ui.header {\n      margin-top: 3em;\n      margin-bottom: 0em;\n      font-size: 4em;\n      font-weight: normal;\n    }\n    .masthead h2 {\n      font-size: 1.7em;\n      font-weight: normal;\n    }\n\n    .ui.vertical.stripe {\n      padding: 8em 0em;\n    }\n    .ui.vertical.stripe h3 {\n      font-size: 2em;\n    }\n    .ui.vertical.stripe .button + h3,\n    .ui.vertical.stripe p + h3 {\n      margin-top: 3em;\n    }\n    .ui.vertical.stripe .floated.image {\n      clear: both;\n    }\n    .ui.vertical.stripe p {\n      font-size: 1.33em;\n    }\n    .ui.vertical.stripe .horizontal.divider {\n      margin: 3em 0em;\n    }\n\n    .quote.stripe.segment {\n      padding: 0em;\n    }\n    .quote.stripe.segment .grid .column {\n      padding-top: 5em;\n      padding-bottom: 5em;\n    }\n\n    .footer.segment {\n      padding: 5em 0em;\n    }\n\n    .secondary.pointing.menu .toc.item {\n      display: none;\n    }\n\n    @media only screen and (max-width: 700px) {\n      .ui.fixed.menu {\n        display: none !important;\n      }\n      .secondary.pointing.menu .item,\n      .secondary.pointing.menu .menu {\n        display: none;\n      }\n      .secondary.pointing.menu .toc.item {\n        display: block;\n      }\n      .masthead.segment {\n        min-height: 350px;\n      }\n      .masthead h1.ui.header {\n        font-size: 2em;\n        margin-top: 1.5em;\n      }\n      .masthead h2 {\n        margin-top: 0.5em;\n        font-size: 1.5em;\n      }\n    }\n\n\n  ",
        }}
      />

      {/* Page Contents */}
      <div className="pusher">
        <div className="ui vertical masthead center aligned segment">
          <div className="ui text container">
            <h1 className="ui header" id="title">
              Moddit
            </h1>
            <h2 id="subtitle">Collaborate with your peers!</h2>
            <br />
            {!isAuthenticated && (
              <div className="ui huge secondary button">
                <Link to="/register">
                  <h3 className="ui inverted header">
                    &nbsp; &nbsp; Get Started <i className="right arrow icon" />
                  </h3>
                </Link>
              </div>
            )}
          </div>
        </div>

        <div className="ui vertical stripe segment">
          <div className="ui middle aligned stackable grid container">
            <div className="row">
              <div className="eight wide column">
                <h3 className="ui header">Add Modules to your dashboard!</h3>
                <p>
                  Adding modules allow you to participate in the Module Forums!
                  Allowing you to have discussion with your peers taking the
                  same module.
                </p>
                <h3 className="ui header">Complete your Modules!</h3>
                <p>
                  Completing your modules will give you access to special tags
                  to help your juniors out!
                </p>
              </div>
              <div className="six wide right floated column">
                <img
                  src={require("../img/homepage.jpg")}
                  className="ui large bordered rounded image"
                />
              </div>
            </div>
            <div className="row">
              <div className="center aligned column">
                <a className="ui small button">
                  <Link to="/module">
                    <h3 className="ui grey header">Add Modules Here</h3>
                  </Link>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="ui vertical stripe segment">
          <div className="ui text container">
            <h4 className="ui horizontal header divider">Module Discussions</h4>
            <h3 className="ui header">MEANINGFUL DISCUSSIONS</h3>
            <p>
              Unsure of class contents? Head over to the Module Discussions to
              learn from your fellow peers!
            </p>

            <h4 className="ui horizontal header divider">Module Marketplace</h4>
            <h3 className="ui header">SHARE MATERIALS</h3>
            <p>
              Looking for class materials? Head over to the Module Marketplace
              to browse through files shared by your fellow peers!
            </p>

            <h4 className="ui horizontal header divider">Module Listings</h4>
            <h3 className="ui header">CONNECT VIA CHAT</h3>
            <p>
              Looking for a study group? Create a Module Listing to arrange for
              a study session or consultation!
            </p>
          </div>
        </div>

        <div className="ui vertical stripe quote segment">
          <div className="ui equal width stackable internally celled grid">
            <div className="center aligned row">
              <div className="column">
                <h3>Leaderboards</h3>
                <p>Earn points to reach the top of the leaderboards!</p>
              </div>
              <div className="column">
                <h3>Badges</h3>
                <p>
                  Make contributions to earn different badges for bragging
                  rights!
                  <br />
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(Main);
