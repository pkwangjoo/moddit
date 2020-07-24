import React from "react";
import { Link } from "react-router-dom";

const Main = () => {
  return (
    <div>
      <style type="text/css" dangerouslySetInnerHTML={{ __html: "\n\n    .hidden.menu {\n      display: none;\n    }\n\n    .masthead.segment {\n      min-height: 700px;\n      padding: 1em 0em;\n    }\n    .masthead .logo.item img {\n      margin-right: 1em;\n    }\n    .masthead .ui.menu .ui.button {\n      margin-left: 0.5em;\n    }\n    .masthead h1.ui.header {\n      margin-top: 3em;\n      margin-bottom: 0em;\n      font-size: 4em;\n      font-weight: normal;\n    }\n    .masthead h2 {\n      font-size: 1.7em;\n      font-weight: normal;\n    }\n\n    .ui.vertical.stripe {\n      padding: 8em 0em;\n    }\n    .ui.vertical.stripe h3 {\n      font-size: 2em;\n    }\n    .ui.vertical.stripe .button + h3,\n    .ui.vertical.stripe p + h3 {\n      margin-top: 3em;\n    }\n    .ui.vertical.stripe .floated.image {\n      clear: both;\n    }\n    .ui.vertical.stripe p {\n      font-size: 1.33em;\n    }\n    .ui.vertical.stripe .horizontal.divider {\n      margin: 3em 0em;\n    }\n\n    .quote.stripe.segment {\n      padding: 0em;\n    }\n    .quote.stripe.segment .grid .column {\n      padding-top: 5em;\n      padding-bottom: 5em;\n    }\n\n    .footer.segment {\n      padding: 5em 0em;\n    }\n\n    .secondary.pointing.menu .toc.item {\n      display: none;\n    }\n\n    @media only screen and (max-width: 700px) {\n      .ui.fixed.menu {\n        display: none !important;\n      }\n      .secondary.pointing.menu .item,\n      .secondary.pointing.menu .menu {\n        display: none;\n      }\n      .secondary.pointing.menu .toc.item {\n        display: block;\n      }\n      .masthead.segment {\n        min-height: 350px;\n      }\n      .masthead h1.ui.header {\n        font-size: 2em;\n        margin-top: 1.5em;\n      }\n      .masthead h2 {\n        margin-top: 0.5em;\n        font-size: 1.5em;\n      }\n    }\n\n\n  " }} />

      {/* Page Contents */}
      <div className="pusher">
        <div className="ui vertical masthead center aligned segment">
          <div className="ui text container">
            <h1 className="ui header">
              Moddit
                </h1>
            <h2>Collaborate with your peers!</h2>
            <br/>
            <div className="ui huge secondary button">
              <Link to="/forums">
                <h3 className="ui inverted header">
                &nbsp; &nbsp; Get Started <i className="right arrow icon" />
                </h3>
              </Link>
                
            </div>
          </div>
        </div>

        <div className="ui vertical stripe segment">
          <div className="ui middle aligned stackable grid container">
            <div className="row">
              <div className="eight wide column">
                <h3 className="ui header">Add Modules to your dashboard!</h3>
                <p>Adding modules allow you to participate in the Module Forums! Allowing you to have discussion with your peers taking the same module.</p>
                <h3 className="ui header">Complete your Modules!</h3>
                <p>Completing your modules will give you access to special tags to help your juniors out!</p>
              </div>
              <div className="six wide right floated column">
                <img src="assets/images/wireframe/white-image.png" className="ui large bordered rounded image" />
              </div>
            </div>
            <div className="row">
              <div className="center aligned column">
                <a className="ui small button">
                <Link to="/module">
                <h3 className="ui grey header">
                Add Modules Here
                </h3>
                </Link>
                </a>
              </div>
            </div>
          </div>
        </div>

        
        
        <div className="ui vertical stripe segment">  
          <div className="ui text container">
          <h4 className="ui horizontal header divider">
              <a href="#">Module Discussions</a>
            </h4>
            <h3 className="ui header">INTENSE DISCUSSIONS</h3>
            <p>Unsure of class contents? Head over to the Module Discussions to learn from your fellow peers!</p>
            {/* <a className="ui large button">Read More</a> */}
            <h4 className="ui horizontal header divider">
              <a href="#">Module Marketplace</a>
            </h4>
            <h3 className="ui header">SHARE MATERIALS</h3>
            <p>Looking for class materials? Head over to the Module Marketplace to browse through files shared by your fellow peers!</p>
            {/* <div className="center aligned column">
                <img src="assets/images/wireframe/white-image.png" className="ui large bordered rounded image" />
              </div> */}
            <h4 className="ui horizontal header divider">
              <a href="#">Module Listings</a>
            </h4>
            <h3 className="ui header">CONNECT VIA CHAT</h3>
            <p>Looking for a study group? Create a Module Listing to arrange for a study session or consultation!</p>
            {/* <a className="ui large button">I'm Still Quite Interested</a> */}
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
                  Make contributions to earn different badges for bragging rights!
                  <br/>
                  {/* <img src="assets/images/avatar/nan.jpg" className="ui avatar image" /> */}
                    </p>
              </div>
            </div>
          </div>
        </div>

        {/* <div className="ui vertical stripe segment">
          <div className="ui text container">
            <h3 className="ui header">Breaking The Grid, Grabs Your Attention</h3>
            <p>Instead of focusing on content creation and hard work, we have learned how to master the art of doing nothing by providing massive amounts of whitespace and generic content that can seem massive, monolithic and worth your attention.</p>
            <a className="ui large button">Read More</a>
            <h4 className="ui horizontal header divider">
              <a href="#">Case Studies</a>
            </h4>
            <h3 className="ui header">Did We Tell You About Our Bananas?</h3>
            <p>Yes I know you probably disregarded the earlier boasts as non-sequitur filler content, but its really true. It took years of gene splicing and combinatory DNA research, but our bananas can really dance.</p>
            <a className="ui large button">I'm Still Quite Interested</a>
          </div>
        </div> */}
        {/* <div className="ui inverted vertical footer segment">
          <div className="ui container">
            <div className="ui stackable inverted divided equal height stackable grid">
              <div className="three wide column">
                <h4 className="ui inverted header">About</h4>
                <div className="ui inverted link list">
                  <a href="#" className="item">Sitemap</a>
                  <a href="#" className="item">Contact Us</a>
                  <a href="#" className="item">Religious Ceremonies</a>
                  <a href="#" className="item">Gazebo Plans</a>
                </div>
              </div>
              <div className="three wide column">
                <h4 className="ui inverted header">Services</h4>
                <div className="ui inverted link list">
                  <a href="#" className="item">Banana Pre-Order</a>
                  <a href="#" className="item">DNA FAQ</a>
                  <a href="#" className="item">How To Access</a>
                  <a href="#" className="item">Favorite X-Men</a>
                </div>
              </div>
              <div className="seven wide column">
                <h4 className="ui inverted header">Footer Header</h4>
                <p>Extra space for a call to action inside the footer that could help re-engage users.</p>
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
}

export default Main;
