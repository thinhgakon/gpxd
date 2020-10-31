import React from 'react';
import { Breadcrumb, Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Link, NavLink } from "react-router-dom";

import { Helmet } from 'react-helmet';
import ProjectSummary from './ProjectSummary';

const ProjectList = (props) => {
    const { projects } = props;
    return (
        <>
            <Helmet>
                <title>AntDesign | Products</title>
            </Helmet>
            <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item>Home</Breadcrumb.Item>
                <Breadcrumb.Item>Products</Breadcrumb.Item>
            </Breadcrumb>
            <div className="site-layout-background site-layout-signin" style={{ padding: 24, minHeight: 360 }}>
                <div className="project-list section">
                    {projects && projects.map(project => {
                        return (
                            <Link to={'/project/' + project.id} key={project.id} >
                                <ProjectSummary project={project} />
                            </Link>
                        )
                    })}
                </div>
            </div>
        </>
    )
}

export default ProjectList