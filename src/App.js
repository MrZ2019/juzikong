import './App.css';
import { Tabs } from 'antd';
import React from 'react';

// import Add from './components/add';
// import List from './components/list';
// import Tags from './components/tags';
// import TagDetail from './components/tagDetail';

import Header from './layout/Header'
import {BrowserRouter, Routes, Route, Outlet, NavLink} from 'react-router-dom'


import store from './store'
import {Provider} from 'react-redux'
const { TabPane } = Tabs;


function NavList() {
  // This styling will be applied to a <NavLink> when the
  // route that it links to is currently selected.
  }

const onChange = (key) => {
  console.log(key);
};


const App = () => (
  <Provider store={store}>
  <div class="app">
    {/* <NavList></NavList> */}
    <Header></Header>
    <div className="outlet">
      <Outlet></Outlet>
    </div>
  </div>
  </Provider>
);

export default App;