import React, { useEffect, useState } from 'react';
import { Table, Space, Tag } from 'antd';
import { Link } from "react-router-dom";

const colors = {
    "Đã lập biên bản": "magenta",
    "Đã gửi thông báo": "orange",
    "Đang xử lý": "geekblue",
    "Đã xử lý": "cyan"
}
const statusColors = {
    "Bản nháp": "magenta",
    "Công khai": "geekblue",
    "Hoàn thành": "cyan",
}

const columns = [
    {
        title: 'Họ tên',
        dataIndex: 'fullName',
        key: 'fullName',
        render: (text, record) => (
            <Link to={'/user/' + record.key} key={record.key} >{text}</Link>
        ),
    },
    {
        title: 'Vai trò',
        dataIndex: 'role',
        key: 'role',
    },
    {
        title: 'Thao tác',
        key: 'action',
        render: (text, record) => (
            <Space size="middle">
                <Link to={'/user/edit/' + record.key} key={record.key} >Edit</Link>
                <a>Delete </a>
            </Space>
        ),
    },
];

const TableUsers = (props) => {
    const { users } = props;
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (users != undefined) {
            setLoading(false);
        }
    }, [users]);

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
                dataSource={users} />
        </>
    )
}

export default TableUsers