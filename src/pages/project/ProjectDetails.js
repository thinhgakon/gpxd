import React from 'react';
import { useSelector, useDispatch } from "react-redux";
import { useFirestoreConnect } from 'react-redux-firebase';
import { Divider, Breadcrumb } from 'antd';
import { Helmet } from 'react-helmet';
import { Link, NavLink, Redirect } from "react-router-dom";
import { getAProject } from '../../store/actions/projectActions'

const ProjectDetails = (props) => {
    const dispatch = useDispatch();
    const id = props.match.params.id;

    useFirestoreConnect(['projects'])
    const projects = useSelector(state => state.firestore.ordered.projects);

    const auth = useSelector(state => state.firebase.auth);
    if (!auth.uid) return <Redirect to='/signin' />

    const projectIndex = projects ? projects.findIndex((project) => project.id == id) : null;
    const project = projects ? projects[projectIndex] : null;

    if (!project) return null;
    dispatch(getAProject(id));

    return (
        <>
            <Helmet>
                <title>AntDesign | Product Details</title>
            </Helmet>
            <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item>Home</Breadcrumb.Item>
                <Breadcrumb.Item>
                    <NavLink to="/project" activeClassName="active">Projects</NavLink>
                </Breadcrumb.Item>
                <Breadcrumb.Item>Product Details</Breadcrumb.Item>
            </Breadcrumb>
            <div className="site-layout-background site-layout-signin" style={{ padding: 24, minHeight: 360 }}>
                <p>
                    <b>Title:</b> {project.title}
                </p>
                <Divider />
                <p>
                    <b>Content:</b> {project.content}
                </p>
                <Divider />
                <p>
                    <b>Posted by:</b> {project.authorFirstName} {project.authorLastName}
                </p>
                <Divider />
                <p>
                    {/* {project.createdAt} */}
                </p>
            </div>
        </>
    );
};

export default ProjectDetails;