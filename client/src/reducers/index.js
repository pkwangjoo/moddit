import { combineReducers } from "redux";
import auth from "./auth";
import post from "./post";
import profile from "./profile";
import forum from "./forum";

export default combineReducers({
  auth,
  post,
  profile,
  forum,
});
