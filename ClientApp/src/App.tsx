import React, { Component } from 'react';
import { Route, Routes } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';

import './custom.css'
import UserStore from "./stores/UserStore";

export default class App extends Component {
  static displayName = App.name;
  
  render () {
    const userStore = new UserStore();
    
    return (
      <Layout>
        <Routes>
          <Route path='/' element={<Home store={userStore} />} />
        </Routes>
      </Layout>
    );
  }
}
