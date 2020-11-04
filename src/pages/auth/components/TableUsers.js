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
        title: 'Chủ hộ',
        dataIndex: 'owner',
        key: 'owner',
        render: (text, record) => (
            <Link to={'/project/' + record.key} key={record.key} >{text}</Link>
        ),
    },
    {
        title: 'Địa chỉ',
        dataIndex: 'address',
        key: 'address',
    },
    {
        title: 'Người tạo',
        key: 'creatorFullName',
        render: (text, record) => (
            <>
                {record.creatorFullName}
            </>
        ),
    },
    {
        title: 'Tình trạng',
        key: 'tinhtrangxuly',
        render: (text, record) => (
            <>
                <Tag color={colors[record.tinhtrangxuly]}>
                    {record.tinhtrangxuly}
                </Tag>
            </>
        ),
    },
    {
        title: 'Trạng thái',
        key: 'status',
        render: (text, record) => (
            <>
                <Tag color={statusColors[record.status]}>
                    {record.status}
                </Tag>
            </>
        ),
    },
    {
        title: 'Ngày tạo',
        key: 'CreatedAt',
        render: (text, record) => (
            <>
                {record.createdAt.toDate().toDateString()}
                {/* {record.createdAt.toDate().toLocaleTimeString('en-US')} */}
            </>
        ),
    },
    {
        title: 'Thao tác',
        key: 'action',
        render: (text, record) => (
            <Space size="middle">
                <Link to={'/project/edit/' + record.key} key={record.key} >Edit</Link>
                <a>Delete </a>
            </Space>
        ),
    },
];

const TableUsers = (props) => {
    const { projects } = props;
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (projects != undefined) {
            setLoading(false);
        }
    }, [projects]);

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
                dataSource={projects} />
        </>
    )
}

export default TableUsers