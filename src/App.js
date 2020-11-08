import React from 'react';
import {
  BrowserRouter, Switch, Route, HashRouter
} from "react-router-dom";
import 'antd/dist/antd.css';
import './index.css';
import HomePage from './pages/home/HomePage';
import SignIn from './pages/auth/SignIn';
import SignUp from './pages/auth/SignUp';
import ProjectList from './pages/project/ProjectList';
import CreateProject from './pages/project/CreateProject';
import ProjectDetails from './pages/project/ProjectDetails';
import EditProject from './pages/project/EditProject';
import SimpleData from './pages/SimpleData';
import UserList from './pages/user/UserList';
import CommonLayout from './layouts/CommonLayout';

function App() {
  return (
    <HashRouter basename='/'>
      <BrowserRouter>
        <Switch>
          <CommonLayout path="/home" component={HomePage} />
          <Route path="/signin" component={SignIn} />
          <CommonLayout path="/signup" component={SignUp} />
          <CommonLayout exact path="/user" component={UserList} />
          <CommonLayout exact path="/project" component={ProjectList} />
          <CommonLayout path="/project/add" component={CreateProject} />
          <CommonLayout path="/project/edit/:id" component={EditProject} />
          <CommonLayout path='/project/:id' component={ProjectDetails} />
          <CommonLayout path="/simpledata" component={SimpleData} />
          <CommonLayout path="/" component={ProjectList} />
        </Switch>
      </BrowserRouter >
    </HashRouter>
  );
}

export default App;
