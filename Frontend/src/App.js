import logo from './logo.svg';
import React from 'react';
import './App.css';
import {BrowserRouter as Router} from 'react-router-dom';
import {Routes, Route} from 'react-router';
import { Action } from 'react-router';

import ListEmployeeComponent from './components/ListEmployeeComponent';
import HeaderComponent from './components/HeaderComponent';
import FooterComponent from './components/FooterComponent';
import CreateEmployeeComponent from './components/CreateEmployeeComponent';
import UpdateEmployeeComponent from './components/UpdateEmployeeComponent';
import ViewEmployeeComponent from './components/ViewEmployeeComponent';

function App() {
  return (
    <div>
      <Router>
        
            <HeaderComponent/>
              <div className="container">
                <Routes>
                    <Route path="/" exact element={<ListEmployeeComponent/>}></Route>
                    <Route path="/employees" element={<ListEmployeeComponent/>}></Route>
                    <Route path="/add-employee/:id" element={<CreateEmployeeComponent/>}></Route>
                    <Route path="/update-employee/:id" element={<CreateEmployeeComponent />} />
                    <Route path="/view-employee/:id" element={<ViewEmployeeComponent/>}></Route>
                    {/*<Route path="/update-employee/:id" element={<UpdateEmployeeComponent/>}></Route> */}
                </Routes>
              </div>
      </Router>
    </div>
  );
}

export default App;
