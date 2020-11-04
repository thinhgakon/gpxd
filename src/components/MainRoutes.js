import React from 'react';
import {
    Switch,
    Route,
} from "react-router-dom";
import HomePage from './../pages/home/HomePage';
import SignIn from './../pages/auth/SignIn';
import SignUp from './../pages/auth/SignUp';
import ProjectList from './../pages/project/ProjectList';
import CreateProject from './../pages/project/CreateProject';
import ProjectDetails from './../pages/project/ProjectDetails';
import EditProject from './../pages/project/EditProject';
import SimpleData from '../pages/SimpleData';
import UserList from '../pages/auth/UserList';

const MainRoutes = () => {
    return (
        <>
            <Switch>
                <Route path="/home">
                    <HomePage />
                </Route>
                <Route path="/signin">
                    <SignIn />
                </Route>
                <Route path="/signup">
                    <SignUp />
                </Route>
                <Route exact path="/user">
                    <UserList />
                </Route>
                <Route exact path="/project">
                    <ProjectList />
                </Route>
                <Route path="/project/add" component={CreateProject} />
                <Route path="/project/edit/:id" component={EditProject} />
                <Route path='/project/:id' component={ProjectDetails} />
                <Route path="/simpledata">
                    <SimpleData />
                </Route>
                <Route path="/">
                    <ProjectList />
                </Route>
            </Switch>
        </>
    );
};

export default MainRoutes;