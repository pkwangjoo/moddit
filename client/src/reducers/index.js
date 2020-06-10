import { combineReducers } from "redux";
import auth from "./auth";
import post from "./post";
import profile from "./profile";
import forum from "./forum";
import comment from "./comment";

export default combineReducers({
  auth,
  post,
  profile,
  forum,
  comment,
});
