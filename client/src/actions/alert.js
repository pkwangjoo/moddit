import uuid from "uuid";

export const addAlert = (msg, msgType) => (dispatch) => {
  const id = uuid.v4();
  dispatch({
    type: "ADD_ALERT",
    payload: { msg, msgType, id },
  });

  setTimeout(() => dispatch({ type: "REMOVE_ALERT", payload: id }), 4000);
};
