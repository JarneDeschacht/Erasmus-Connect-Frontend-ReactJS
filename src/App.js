import React, { useEffect, useCallback } from 'react';
import Layout from './hoc/Layout/Layout';
import Main from './containers/Main/Main';
import Login from './containers/Login/Login';
import { Route, Switch, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from './store/actions/index';
import Logout from './containers/Logout/Logout';
import './App.css';

const App = props => {

  const dispatch = useDispatch();
  const isAuthenticated = useSelector(state => state.auth.idToken !== null);
  const onTryAutoSignup = useCallback(() => dispatch(actions.authCheckState()), [dispatch]);

  useEffect(() => {
    onTryAutoSignup();
  }, [onTryAutoSignup]);

  let routes = (
    <Switch>
      <Route path="/login" component={Login} />
      <Route path="/" exact component={Main} />
      <Redirect to="/" />
    </Switch>
  )

  if (isAuthenticated) {
    routes = (
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/profile" component={Main} />
        <Route path="/logout" component={Logout} />
        <Route path="/" exact component={Main} />
        <Redirect to="/" />
      </Switch>
    )
  }

  return (
    <div>
      <Layout>
        {routes}
      </Layout>
    </div>
  );
}

export default App;
