import React, { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Navbar from "./components/layout/Navbar";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Main from "./components/layout/Main";
import PostList from "./components/posts/PostList";
import ProtectedRoute from "./components/route/ProtectedRoute";
import Dashboard from "./components/dashboard/Dashboard";
import CreateProfile from "./components/dashboard/CreateProfile";
import PostForm from "./components/posts/PostForm";
import Post from "./components/posts/Post";
import Forum from "./components/forum/Forum";
import ForumList from "./components/forum/ForumList";
import ForumPostForm from "./components/posts/ForumPostForm";
import Chat from "./components/chat/Chat";
import ChatRoomList from "./components/chat/ChatRoomList";
import ListingForm from "./components/listing/ListingForm";
import Listing from "./components/listing/Listing";
import { Provider } from "react-redux";
import store from "./store";
import setAuthToken from "./utils/setAuthToken";
import { loadUser } from "./actions/auth";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />

          <div className="ui main text container">
            <Route exact path="/" component={Main} />

            <Switch>
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />
              <ProtectedRoute exact path="/forums" component={ForumList} />
              <ProtectedRoute
                exact
                path="/forums/:forum_id"
                component={Forum}
              />
              <ProtectedRoute exact path="/posts" component={PostList} />
              <ProtectedRoute exact path="/dashboard" component={Dashboard} />
              <ProtectedRoute
                exact
                path="/createprofile"
                component={CreateProfile}
              />
              <ProtectedRoute exact path="/posts/new" component={PostForm} />
              <ProtectedRoute exact path="/posts/:post_id" component={Post} />
              <ProtectedRoute
                exact
                path="/forums/:forum_id/posts/new"
                component={ForumPostForm}
              />
              <ProtectedRoute
                exact
                path="/forums/:forum_id/listings/new"
                component={ListingForm}
              />
              <ProtectedRoute
                exact
                path="/listing/:listing_id"
                component={Listing}
              />
              <ProtectedRoute exact path="/chat" component={Chat} />
              <ProtectedRoute
                exact
                path="/chat/join"
                component={ChatRoomList}
              />
            </Switch>
          </div>
        </Fragment>
      </Router>
    </Provider>
  );
}

export default App;
