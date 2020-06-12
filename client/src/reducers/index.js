import { combineReducers } from "redux";
import auth from "./auth";
import post from "./post";
import profile from "./profile";
import forum from "./forum";
import comment from "./comment";
import chat from "./chat";
import chatRoom from "./chatRoom";

export default combineReducers({
  auth,
  post,
  profile,
  forum,
  comment,
  chat,
  chatRoom,
});
