import React from "react";
import { connect } from "react-redux";

const Alert = ({ alert }) => {
  return (
    alert !== null &&
    alert &&
    alert.length > 0 && (
      <div>
        {alert.map((alert) => (
          <div className={`ui tiny ${alert.msgType} message`}>
            <div className="header">{alert.msg}</div>
          </div>
        ))}
      </div>
    )
  );
};

const mapStateToProps = (state) => ({
  alert: state.alert,
});

export default connect(mapStateToProps)(Alert);
