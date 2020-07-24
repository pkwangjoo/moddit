import { v4 as uuid } from "uuid";

export const addAlert = (msg, msgType) => (dispatch) => {
  console.log("add alert");
  const id = uuid();
  dispatch({
    type: "ADD_ALERT",
    payload: { msg, msgType, id },
  });

  setTimeout(() => dispatch({ type: "REMOVE_ALERT", payload: id }), 2000);
};
