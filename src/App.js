import React from 'react';
import Layout from './hoc/Layout/Layout';
import Main from './containers/Main/Main';
import './App.css';

function App() {
  return (
    <div>
      <Layout>
        <Main />
      </Layout>
    </div>
  );
}

export default App;
