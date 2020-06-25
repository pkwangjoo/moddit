import PropTypes from 'prop-types';
import React, { Component } from 'react';
import './Main.css';

// const Main = () => {
//   return <div>Main Page</div>
// };

const Main = () => (
  <div>
    <div className="admin-bg">
      <img
        src={require("../img/background1.jpg")}
        alt="bg"
        class="bg"
      />
    </div>

    <div className="main">
      <div className="banner-text">
        <h1>Moddit</h1>
        <p>Login to get started!</p>
      </div>
    </div>
  </div>
)

// .propTypes = {
//   mobile: PropTypes.bool,
// }

export default Main;
