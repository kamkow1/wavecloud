import React, { Component } from 'react';
import { Route, Routes } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';

import './custom.css'
import UserStore from "./stores/UserStore";
import Login from "./components/Login/Login";
import Upload from "./components/Upload/Upload";
import Register from './components/Register/Register';

export default class App extends Component {
  static displayName = App.name;
  
  render () {
      const userStore = new UserStore();
    
      return (
          <Layout store={userStore}>
              <Routes>
                  <Route path='/' element={<Home store={userStore} />} />
                  <Route path='/login' element={<Login store={userStore} />} />
                  <Route path='/upload' element={<Upload store={userStore} />} />
                  <Route path='/register' element={<Register store={userStore} />} />
              </Routes>
          </Layout>
      );
  }
}
