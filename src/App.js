import './App.css';
import { Tabs } from 'antd';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';

// import Add from './components/add';
// import List from './components/list';
// import Tags from './components/tags';
// import TagDetail from './components/tagDetail';

import Header from './layout/Header'
import { BrowserRouter, Routes, Route, Outlet, NavLink } from 'react-router-dom'


import bus from './bus'

import request from './request'
const { TabPane } = Tabs;


function NavList() {
  // This styling will be applied to a <NavLink> when the
  // route that it links to is currently selected.
}

const onChange = (key) => {
  console.log(key);
};

class App extends React.Component {
  fetchCollection(juzi_id = '') {
    request.get('/collection/query?juzi_id=' + juzi_id).then((res) => {
      console.log(res)
      return res
    }).then((res) => {
      for (let index = 0; index < res.countData.length; index++) {
        const element = res.countData[index];

        for (let index = 0; index < res.data.length; index++) {
          const element2 = res.data[index];

          if (element.id == element2.id) {
            element2.rows = element.rows
            break
          }
        }
      }
      res.juziData = res.juziData || []
      for (let index = 0; index < res.juziData.length; index++) {
        const element = res.juziData[index];

        for (let index = 0; index < res.data.length; index++) {
          const element2 = res.data[index];

          if (element.collection_id == element2.id) {
            element2.exist = true
            break
          }
        }
      }
      this.props.dispatch({
        type: 'SET_COLLECTION',
        payload: res
      })
    });
  }

  fetchTags() {
    request.get('/tag/query').then((res) => {
      return res
    }).then((res) => {
      this.props.dispatch({
        type: 'SET_TAG',
        payload: res
    })      
    })
  }

  componentDidMount() {
    console.log(this.props)
    bus.on('fetchCollection', (juzi_id) => {
      this.fetchCollection(juzi_id)
    })
    this.fetchCollection()
    this.fetchTags()
  }

  render() {
    return (
      <div class="app">
        {/* <NavList></NavList> */}
        <Header></Header>
        <div className="outlet">
          <Outlet></Outlet>
        </div>
      </div>
    )
  }
}


export default connect()(App);