import React from "react";
import { connect } from "react-redux";

const Alert = ({ alert }) => {
  return (
    alert !== null &&
    alert &&
    alert.length > 0 && (
      <div>
        {alert.map((alert) => (
          <div>{alert.msg}</div>
        ))}
      </div>
    )
  );
};

const mapStateToProps = (state) => ({
  alert: state.alert,
});

export default connect(mapStateToProps)(Alert);
