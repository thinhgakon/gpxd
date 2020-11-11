import React, { useEffect, useState } from 'react';
import { Table, Space, Tag } from 'antd';
import { NavLink } from "react-router-dom";
import {
    EditOutlined,
    DeleteOutlined,
} from '@ant-design/icons';

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

const TableProjects = (props) => {
    const { projects } = props;
    const [loading, setLoading] = useState(true);
    const [filteredInfo, setFilteredInfo] = useState(null);

    let filterInfo = filteredInfo;
    filterInfo = filterInfo || {};

    const columns = [
        {
            title: 'Chủ hộ',
            dataIndex: 'owner',
            key: 'owner',
            render: (text, record) => (
                <NavLink to={'/project/' + record.key} key={record.key} >{text}</NavLink>
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
            dataIndex: 'address',
            key: 'tinhtrangxuly',
            filters: [
                { text: 'Đã lập biên bản', value: 'Đã lập biên bản' },
                { text: 'Đã gửi thông báo', value: 'Đã gửi thông báo' },
                { text: 'Đang xử lý', value: 'Đang xử lý' },
                { text: 'Đã xử lý', value: 'Đã xử lý' },
            ],
            filteredValue: filterInfo.tinhtrangxuly || null,
            onFilter: (value, record) => record.tinhtrangxuly ? record.tinhtrangxuly.includes(value) : "",
            ellipsis: true,
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
                </>
            ),
        },
        {
            title: 'Thao tác',
            key: 'action',
            render: (text, record) => (
                <Space size="middle">
                    <NavLink to={'/project/edit/' + record.key} key={record.key} style={{ color: "#04ccb0" }} >{<EditOutlined />} Sửa</NavLink>
                    <a style={{ color: "#ff046c" }}>{<DeleteOutlined />} Xóa</a>
                </Space>
            ),
        },
    ];

    useEffect(() => {
        if (projects != undefined) {
            setLoading(false);
        }
    }, [projects]);

    const handleChange = (pagination, filters, sorter) => {
        console.log('Various parameters', pagination, filters, sorter);
        setFilteredInfo(filters);
    };

    return (
        <>
            <Table
                loading={loading}
                columns={columns}
                expandable={{
                    expandedRowRender: record =>
                        <>
                            <p><b>Giấy phép số:</b> {record.permitNumber} - <b>Cấp ngày:</b> {record.permitDate}</p>
                            <p><b>Diện tích cấp phép:</b> {record.permitAcreage} - <b>Thực tế:</b> {record.realAcreage}</p>
                            <p><b>Tờ bản đồ số:</b> {record.bandoso} - <b>Thửa đất số:</b> {record.thuadatso}</p>
                            <p><b>Quy hoạch đường:</b> {record.qhduong} - <b>Quy hoạch mương:</b> {record.qhmuong} - <b>Quy hoạch điện:</b> {record.qhdien}</p>
                            <p><b>Nội dung phát hiện:</b> {record.content}</p>
                            <p><b>Có tranh chấp không:</b> {record.tranhchap}</p>
                            <p><b>Đã lập biên bản số:</b> {record.bienbanso}</p>
                            <p><b>Hướng xử lý:</b> {record.huongxuly}</p>
                            <p><b>Kết quả xử lý:</b> {record.ketquaxuly}</p>
                            <p><b>Cơ quan kiểm tra:</b> {record.coquankiemtra}</p>
                        </>,
                }}
                dataSource={projects}
                scroll={{ x: 1300 }}
                onChange={handleChange}
            />
        </>
    )
}

export default TableProjects