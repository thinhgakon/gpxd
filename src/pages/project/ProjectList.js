import React, { useEffect, useState } from 'react';
import { Breadcrumb, Form, Input, Button, Checkbox, Table, Tag, Space } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Link, NavLink, Redirect } from "react-router-dom";

import { Helmet } from 'react-helmet';
import ProjectSummary from './ProjectSummary';
import { useSelector } from 'react-redux';

const columns = [
    {
        title: 'Chủ hộ',
        dataIndex: 'owner',
        key: 'owner',
        render: (text, record) => (
            <Link to={'/project/' + record.id} key={record.id} >{text}</Link>
        ),
    },
    {
        title: 'Địa chỉ',
        dataIndex: 'address',
        key: 'address',
    },
    {
        title: 'Người tạo',
        key: 'fullname',
        render: (text, record) => (
            <>
                {record.authorFirstName} {record.authorLastName}
            </>
        ),
    },
    {
        title: 'Ngày tạo',
        key: 'CreatedAt',
        render: (text, record) => (
            <>
                {record.createdAt.toDate().toDateString()} {record.createdAt.toDate().toLocaleTimeString('en-US')}
            </>
        ),
    },
    {
        title: 'Thao tác',
        key: 'action',
        render: (text, record) => (
            <Space size="middle">
                <Link to={'/project/edit/' + record.id} key={record.id} >Edit</Link>
                <a>Delete </a>
            </Space>
        ),
    },
];

const ProjectList = (props) => {
    const { projects } = props;
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (projects != undefined) {
            setLoading(false);
        }
    }, [projects]);

    const auth = useSelector(state => state.firebase.auth);
    if (!auth.uid) return <Redirect to='/signin' />

    let newProjects = [];

    if (projects != undefined) {
        newProjects = projects.map(v => ({ ...v, key: v.id }));
    }

    return (
        <>
            <Helmet>
                <title>GPXD | Danh sách</title>
            </Helmet>
            <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item>Trang chủ</Breadcrumb.Item>
                <Breadcrumb.Item>Sai phạm</Breadcrumb.Item>
            </Breadcrumb>
            <div className="site-layout-background site-layout-signin" style={{ padding: 24, minHeight: 360 }}>
                <Table
                    loading={loading}
                    columns={columns}
                    expandable={{
                        expandedRowRender: record =>
                            <>
                                <p><b>Địa chỉ:</b> {record.address}</p>
                                <p><b>Nội dung phát hiện:</b> {record.content}</p>
                            </>,
                    }}
                    dataSource={newProjects} />
            </div>
        </>
    )
}

export default ProjectList