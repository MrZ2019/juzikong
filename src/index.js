import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter, Routes, Route} from 'react-router-dom'

import HomePage from './pages/Home';
import UserPage from './pages/User';

// import Add from './components/add';
// import List from './components/list';
// import Tags from './components/tags';
// import TagDetail from './components/tagDetail';

const root = ReactDOM.createRoot(document.getElementById('root'));


root.render(
  
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage/>}></Route>
          <Route path="u" element={<UserPage/>}></Route>
          {/* <Route path="add" element={<Add />}></Route>
          <Route path="list" element={<List type="list"/>}></Route>
          <Route path="tags" element={<Tags/>}>
            <Route path=":tag" element={<TagDetail />}></Route>
          </Route> */}
        </Route>
        

      </Routes>
    </BrowserRouter>
  
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
