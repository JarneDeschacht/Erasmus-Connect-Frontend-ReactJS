import React from 'react';
import Layout from './hoc/Layout/Layout';
import Main from './containers/Main/Main';
import Login from './containers/Login/Login';
import { Route, Switch, Redirect } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <div>
      <Layout>
        <Switch>
          <Route path="/login" component={Login} />} />
          <Route path="/" exact component={Main} />
          <Redirect to="/" />
        </Switch>
      </Layout>
    </div>
  );
}

export default App;
