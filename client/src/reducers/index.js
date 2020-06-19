import { combineReducers } from "redux";
import auth from "./auth";
import post from "./post";
import profile from "./profile";
import forum from "./forum";
import comment from "./comment";
import chat from "./chat";
import chatRoom from "./chatRoom";
import listing from "./listing";
import user from "./user";
import marketplace from"./marketplace";
import module from "./module";

export default combineReducers({
  auth,
  post,
  profile,
  forum,
  comment,
  chat,
  chatRoom,
  listing,
  user,
  marketplace,
  module,
});
