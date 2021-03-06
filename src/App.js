import React, { useEffect, useCallback } from "react";
import Layout from "./hoc/Layout/Layout";
import Main from "./containers/Main/Main";
import Login from "./containers/Login/Login";
import { Route, Switch, withRouter } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "./store/actions/index";
import Logout from "./containers/Logout/Logout";
import "./App.css";
import Register from "./containers/Register/Register";
import Students from "./containers/Students/Students";
import MyProfile from "./containers/My-Profile/My-Profile";
import StudentProfile from "./containers/Student-Profile/Student-Profile";
import ForgotPassword from "./containers/Login/ForgotPassword/ForgotPassword";
import SetNewPassword from "./containers/Login/SetNewPassword/SetNewPassword";
import RegisterErasmus from "./containers/Register-Erasmus/RegisterErasmus";
import EditProfile from './containers/Edit-Profile/Edit-Profile';
import EditErasmus from './containers/Edit-Erasmus/Edit-Erasmus';
import Chat from "./containers/Chat/Chat";
import Snackbar from "./components/UI/Snackbar/snackbar";
import PageNotFound from "./components/PageNotFound/PageNotFound"
import ProfilePicture from "./containers/ProfilePicture/ProfilePicture"

const App = props => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(state => state.auth.idToken !== null);
  const onTryAutoSignup = useCallback(
    () => dispatch(actions.authCheckState()),
    [dispatch]
  );

  useEffect(() => {
    onTryAutoSignup();
  }, [onTryAutoSignup]);

  let routes = (
    <Switch>
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/forgotPassword" exact component={ForgotPassword} />
      <Route path="/forgotPassword/:id" component={SetNewPassword} />
      <Route path="/register-erasmus" component={RegisterErasmus} />
      <Route path="/" exact component={Main} />
      <Route component={PageNotFound} />
    </Switch>
  );

  if (isAuthenticated) {
    routes = (
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/my-profile" component={MyProfile} />
        <Route path='/edit-profile' component={EditProfile} />
        <Route path='/edit-erasmus' component={EditErasmus} />
        <Route path='/profile-picture' component={ProfilePicture} />
        <Route path="/logout" component={Logout} />
        <Route path="/register-erasmus" component={RegisterErasmus} />
        <Route path="/students" exact component={Students} />
        <Route path="/chat" exact component={Chat} />
        <Route
          path={"/students/:id"}
          render={props => <StudentProfile {...props} />}
        />
        <Route path="/" exact component={Main} />
        <Route component={PageNotFound} />
      </Switch>
    );
  }

  return (
    <div>
      <Snackbar />
      <Layout>{routes}</Layout>
    </div>
  );
};

export default withRouter(App);
