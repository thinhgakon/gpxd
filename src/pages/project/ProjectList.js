import React, { useEffect, useState } from 'react';
import { Breadcrumb, Form, Input, Button, Checkbox, Table, Tag, Space } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Link, NavLink } from "react-router-dom";

import { Helmet } from 'react-helmet';
import ProjectSummary from './ProjectSummary';

const columns = [
    {
        title: 'Title',
        dataIndex: 'title',
        key: 'title',
        render: text => <a>{text}</a>,
    },
    {
        title: 'Content',
        dataIndex: 'content',
        key: 'content',
    },
    {
        title: 'Full Name',
        key: 'fullname',
        render: (text, record) => (
            <>
                {record.authorFirstName} {record.authorLastName}
            </>
        ),
    },
    {
        title: 'Action',
        key: 'action',
        render: (text, record) => (
            <Space size="middle">
                <a>Invite {record.name}</a>
                <a>Delete </a>
            </Space>
        ),
    },
];

const ProjectList = (props) => {
    const { projects } = props;
    const [loading, setLoading] = useState(true);

    let newProjects = [];

    useEffect(() => {
        if (projects != undefined) {
            setLoading(false);
        }
    }, [projects]);

    if (projects != undefined) {
        newProjects = projects.map(v => ({ ...v, key: v.id }));
    }

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
                <Table loading={loading} columns={columns} dataSource={newProjects} />
            </div>
        </>
    )
}

export default ProjectList