import React, { useEffect, useState } from 'react';
import { Table, Space } from 'antd';
import { Link, Redirect } from "react-router-dom";
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

const TableProjects = (props) => {
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
        </>
    )
}

export default TableProjects